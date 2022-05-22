//! Type definition for syntactic node.
//!
//! See <https://github.com/rust-analyzer/rust-analyzer/blob/master/docs/dev/syntax.md>

use anyhow::*;
use itertools::Itertools;
use std::sync::Arc;

use super::{green::GreenNodeData, red::SyntaxNode};

pub trait AstNode {
    fn cast(syntax: SyntaxNode) -> Option<Self>
    where
        Self: Sized;

    fn syntax(&self) -> &SyntaxNode;
}

macro_rules! register_ast_node {
    ($struct_name:ident, $syntax_name:literal) => {
        /// pub struct for $syntax_name
        #[derive(Debug, Clone, PartialEq, Eq, Hash)]
        pub struct $struct_name {
            syntax: SyntaxNode,
        }

        impl AstNode for $struct_name {
            fn cast(syntax: SyntaxNode) -> Option<Self> {
                match syntax.green().kind().as_str() {
                    $syntax_name => Some($struct_name { syntax }),
                    _ => None,
                }
            }

            fn syntax(&self) -> &SyntaxNode {
                &self.syntax
            }
        }
    };
}

register_ast_node!(SourceFile, "source_file");
