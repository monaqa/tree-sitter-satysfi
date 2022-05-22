use thiserror::Error;

#[derive(Debug, Clone, Error)]
pub enum TSSatysfiError {
    #[error("parser does not respond any results.")]
    ParseReturnedNone,
}
