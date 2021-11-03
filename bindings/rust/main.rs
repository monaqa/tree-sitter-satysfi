use std::{fmt::Display, path::PathBuf};

use anyhow::*;
use tree_sitter::{Parser, Query, QueryCursor, TreeCursor};

use structopt::StructOpt;

#[derive(Debug, Clone, StructOpt)]
struct Opts {
    input: PathBuf,
}

fn main() -> Result<()> {
    let opts = Opts::from_args();

    let language_satysfi = tree_sitter_satysfi::language();
    let mut parser = Parser::new();
    parser.set_language(language_satysfi)?;

    let text = std::fs::read_to_string(opts.input).context(anyhow!("The input file not found!"))?;
    let tree = parser
        .parse(&text, None)
        .with_context(|| anyhow!("parse failed!"))?;
    let node = tree.root_node();
    let mut cursor = node.walk();

    let query_sexp = std::fs::read_to_string("queries/highlights.scm")?;
    let query = Query::new(language_satysfi, &query_sexp)?;
    let cap_names = query.capture_names();
    let mut qmatch = QueryCursor::new();
    // この第3引数の text_callback ってなに？？ predicate と関係ありそうだけど
    for m in qmatch.matches(&query, node, |_| &[]) {
        println!("{:?}", m);
        for cap in m.captures {
            println!("{}", cap_names[cap.index as usize]);
        }
    }

    let cst = Cst::from_cursor(&mut cursor, &text);

    println!("{}", cst);

    Ok(())
}

#[derive(Debug, Clone)]
struct Cst {
    kind: String,
    substr: String,
    range: CstRange,
    children: Vec<Cst>,
    field_name: Option<String>,
    named: bool,
    extra: bool,
    error: bool,
    missing: bool,
}

#[derive(Debug, Clone)]
struct CstRange {
    start: (usize, usize),
    end: (usize, usize),
}

impl Cst {
    /// TODO: もっと効率良い方法がありそう
    fn from_cursor(cursor: &mut TreeCursor, text: &str) -> Cst {
        let node = cursor.node();
        let field_name = cursor.field_name().map(|s| s.to_owned());
        let kind = node.kind().to_owned();
        let range = {
            let start = node.start_position();
            let end = node.end_position();
            CstRange {
                start: (start.row, start.column),
                end: (end.row, end.column),
            }
        };
        let substr = {
            let start = node.start_byte();
            let end = node.end_byte();
            &text[start..end]
        }
        .to_owned();
        let children: Vec<_> = node.children(cursor).collect();
        let children = children
            .into_iter()
            .map(|child| {
                let mut cursor = child.walk();
                Cst::from_cursor(&mut cursor, text)
            })
            .collect();
        Cst {
            kind,
            range,
            substr,
            children,
            field_name,
            named: node.is_named(),
            extra: node.is_extra(),
            error: node.is_error(),
            missing: node.is_missing(),
        }
    }

    fn stringify(&self, indent: usize) -> String {
        if !self.named {
            return "".to_owned();
        }
        let mut s = String::new();
        let indent_str = " ".repeat(indent * 2);
        s.push_str(&indent_str);
        if let Some(field_name) = &self.field_name {
            s.push_str(&format!("{}:", field_name,));
        }
        if self.error {
            s.push_str(&format!("[!{}!]", self.kind,));
        } else if self.missing {
            s.push_str(&format!("[?{}?]", self.kind,));
        } else if self.extra {
            s.push_str(&format!("[%{}%]", self.kind,));
        } else {
            s.push_str(&format!("[{}]", self.kind,));
        }
        if !self.substr.contains('\n') && self.substr.len() < 50 {
            s.push_str(&format!(r#" "{}""#, self.substr));
        } else {
            s.push_str(&format!(
                " ({}:{} .. {}:{})",
                self.range.start.0 + 1,
                self.range.start.1 + 1,
                self.range.end.0 + 1,
                self.range.end.1 + 1,
            ));
        }
        s.push('\n');
        for child in &self.children {
            let text = child.stringify(indent + 1);
            s.push_str(&text);
        }
        s
    }
}

impl Display for Cst {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.stringify(0))
    }
}
