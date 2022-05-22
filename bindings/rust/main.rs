use std::{io::Read, sync::Arc};

use tree_sitter::Parser;
use tree_sitter_satysfi::syntax::{green::GreenNode, red::SyntaxNode};

fn main() {
    let input = {
        let mut buf = String::new();
        std::io::stdin()
            .read_to_string(&mut buf)
            .expect("failed to read string from stdin.");
        buf
    };

    // let language_satysfi = tree_sitter_satysfi::language();
    // let mut parser = Parser::new();
    // parser.set_language(language_satysfi).expect("unreachable!");
    // let tree = parser.parse(input, None).unwrap();

    let green_node = GreenNode::new_root(input).expect("Unhandled error.");
    let syntax_node = SyntaxNode::new_root(green_node);
    println!("{}", syntax_node.display_recursive());
}
