use aho_corasick::{AhoCorasick, AhoCorasickBuilder, MatchKind};
use neon::prelude::*;

struct Automaton(AhoCorasick);

impl Finalize for Automaton {}

/// build(patterns: string[]) -> opaque automaton handle
fn build(mut cx: FunctionContext) -> JsResult<JsBox<Automaton>> {
    let values = cx.argument::<JsArray>(0)?.to_vec(&mut cx)?;
    let patterns = values
        .into_iter()
        .map(|value| Ok(value.downcast_or_throw::<JsString, _>(&mut cx)?.value(&mut cx)))
        .collect::<NeonResult<Vec<String>>>()?;

    let automaton = AhoCorasickBuilder::new()
        .match_kind(MatchKind::LeftmostFirst)
        .build(patterns);

    Ok(cx.boxed(Automaton(automaton)))
}

/// findIter(automaton, haystack: string) -> [pattern, start, end][]
/// start/end are UTF-8 byte offsets, as in 0.1.8.
fn find_iter(mut cx: FunctionContext) -> JsResult<JsArray> {
    let automaton = cx.argument::<JsBox<Automaton>>(0)?;
    let haystack = cx.argument::<JsString>(1)?.value(&mut cx);

    let matches: Vec<[usize; 3]> = automaton
        .0
        .find_iter(&haystack)
        .map(|m| [m.pattern(), m.start(), m.end()])
        .collect();

    let result = cx.empty_array();
    for (i, triple) in matches.iter().enumerate() {
        let js_triple = cx.empty_array();
        for (j, n) in triple.iter().enumerate() {
            let js_number = cx.number(*n as f64);
            js_triple.set(&mut cx, j as u32, js_number)?;
        }
        result.set(&mut cx, i as u32, js_triple)?;
    }

    Ok(result)
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("build", build)?;
    cx.export_function("findIter", find_iter)?;
    Ok(())
}
