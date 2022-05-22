//! Type definition for red node (syntax node).
//!
//! See <https://github.com/rust-analyzer/rust-analyzer/blob/master/docs/dev/syntax.md>

use std::{hash::Hash, sync::Arc};

use super::green::{GreenNode, NodeChild};

#[derive(Debug, Clone)]
pub struct SyntaxNode(Arc<SyntaxData>);

impl std::ops::Deref for SyntaxNode {
    type Target = Arc<SyntaxData>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(Debug, Clone, Hash)]
pub struct SyntaxData {
    offset: usize,
    parent: Option<SyntaxNode>,
    green: GreenNode,
}

impl SyntaxData {
    /// Get a reference to the syntax data's green.
    pub fn green(&self) -> GreenNode {
        self.green.clone()
    }
}

impl SyntaxNode {
    pub fn new_root(root: GreenNode) -> SyntaxNode {
        SyntaxNode(Arc::new(SyntaxData {
            offset: 0,
            parent: None,
            green: root,
        }))
    }

    pub fn parent(&self) -> Option<SyntaxNode> {
        self.parent.clone()
    }

    pub fn children(&self) -> impl Iterator<Item = SyntaxNode> + '_ {
        let mut offset = self.offset;
        self.green.children().iter().map(move |green_child| {
            let child_offset = offset;
            offset += green_child.node().text_len();
            SyntaxNode(Arc::new(SyntaxData {
                offset: child_offset,
                parent: Some(self.clone()),
                green: green_child.node(),
            }))
        })
    }

    pub fn children_recursive(&self) -> Vec<SyntaxNode> {
        Some(self.clone())
            .into_iter()
            .chain(self.children().flat_map(|c| c.children_recursive()))
            .collect()
    }

    pub fn text_len(&self) -> usize {
        self.green.text_len()
    }

    pub fn range(&self) -> (usize, usize) {
        (self.offset, self.offset + self.text_len())
    }

    pub fn includes(&self, index: usize) -> bool {
        index >= self.offset && index < self.offset + self.text_len()
    }

    fn dig_child(&self, index: usize) -> Option<SyntaxNode> {
        if !self.includes(index) {
            return None;
        }
        for child in self.children() {
            if child.includes(index) {
                return Some(child);
            }
        }
        None
    }

    /// その SyntaxNode の子要素のうち、その byte 目にある red node の列を取得する。
    pub fn dig(&self, index: usize) -> Vec<SyntaxNode> {
        if let Some(n) = self.dig_child(index) {
            n.dig(index).into_iter().chain(Some(self.clone())).collect()
        } else {
            vec![self.clone()]
        }
    }
    // pub fn dig(&self, index: usize) -> impl Iterator<Item = SyntaxNode> + '_ {
    //     self.dig_child(index)
    //         .map(|n| n.dig(index))
    //         .into_iter()
    //         .flatten()
    //         .chain(Some(self.clone()))
    //     // if let Some(n) = self.dig_child(index) {
    //     //     n.dig(index).into_iter().chain(Some(self.clone())).collect()
    //     // } else {
    //     //     vec![self.clone()]
    //     // }
    // }

    /// そのノードが表すテキストを取得する。
    pub fn text(&self) -> String {
        self.green.text()
    }

    /// 短い文字列で表示する。
    pub fn display_short(&self) -> String {
        let mut s = String::new();
        let (start, end) = self.range();
        if self.green.is_node() {
            s.push_str(&format!(
                r#"[{}] ({}:{})"#,
                self.green().kind().as_str(),
                start,
                end
            ));
        } else {
            s.push_str(&format!(
                r#"'{}' ({}:{})"#,
                self.green().kind().as_str(),
                start,
                end
            ));
        }
        if self.text_len() < 40 && !self.text().contains('\n') {
            s.push_str(&format!(r#" "{}""#, self.text()));
        }
        s
    }

    pub fn display(&self) -> String {
        let mut s = String::new();
        s.push_str(&self.display_short());
        for child in self.children() {
            s.push_str(&format!("  {}", child.display_short()));
        }
        s
    }

    pub fn display_recursive(&self) -> String {
        self.print_aux(0)
    }

    fn print_aux(&self, indent: usize) -> String {
        let mut s = String::new();
        s.push_str(&format!(
            "{}{}\n",
            " ".repeat(indent * 2),
            self.display_short()
        ));
        for child in self.children() {
            s.push_str(&child.print_aux(indent + 1));
        }
        s
    }
}

impl PartialEq for SyntaxNode {
    fn eq(&self, other: &Self) -> bool {
        self.offset == other.offset && Arc::ptr_eq(&self.green, &other.green)
    }
}

impl Eq for SyntaxNode {}

impl Hash for SyntaxNode {
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        self.0.hash(state);
    }
}
#[cfg(test)]
mod tests {
    use super::*;

    fn prepare_root() -> SyntaxNode {
        let green = GreenNode::new_root("(A) foo".to_string()).unwrap();
        SyntaxNode::new_root(green)
    }

    #[test]
    fn test_syntax_node() {
        let root = prepare_root();
        assert_eq!(root.offset, 0);
        assert_eq!(root.parent, None);
        assert_eq!(root.text_len(), 7);
        assert_eq!(root.text(), "(A) foo".to_owned());
        assert!(root.includes(3));
        assert!(root.includes(0));
        assert!(!root.includes(8));
    }

    #[test]
    fn test_syntax_node_children() {
        let root = prepare_root();
        let task = root.children().next().expect("expected child node 'task'.");
        let text = task.children().nth(2).expect("expected child node 'text'.");
        assert_eq!(task.offset, 0);
        assert_eq!(task.parent(), Some(root.clone()));
        assert_eq!(task.text_len(), 7);
        assert_eq!(task.text(), "(A) foo".to_owned());
        assert_eq!(text.offset, 4);
        assert_eq!(text.parent(), Some(task));
        assert_eq!(text.text_len(), 3);
        assert_eq!(text.text(), "foo".to_owned());

        // for n in root.dig(2) {
        //     println!("{}", n.display());
        // }

        println!("{}", root.display_recursive());
    }
}
