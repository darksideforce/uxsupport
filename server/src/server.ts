/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
  InitializeResult,
  HoverParams,
  Hover,
  SignatureHelpParams,
  SignatureHelp,
  DocumentFormattingParams,
  TextEdit,
  DocumentHighlightParams,
  DocumentHighlight,
  DocumentHighlightKind,
} from "vscode-languageserver/node";

import { TextDocument } from "vscode-languageserver-textdocument";
import { UXS } from './operation/serverObj'


// 关键点1： 初始化 LSP 连接对象
const connection = createConnection(ProposedFeatures.all);
// 关键点2： 创建文档集合对象，用于映射到实际文档
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);
const uxs = new UXS(connection);
connection.onInitialize(async (params: InitializeParams) => {
  // 明确声明插件支持的语言特性
  const result: InitializeResult = {
    capabilities: {
      hoverProvider: true,
    },
  };
  await uxs.init(params)
  return result;
});
documents.listen(connection);
connection.listen();


connection.onHover((params: HoverParams): Promise<Hover> => {
  return Promise.resolve({
    contents: ["Hover Demo"],
  });
});
// documents.onDidChangeContent((change) => {
//   const textDocument = change.document;
//   // The validator creates diagnostics for all uppercase words length 2 and more
//   const text = textDocument.getText();
//   const pattern = /\b[A-Z]{2,}\b/g;
//   let m: RegExpExecArray | null;

//   let problems = 0;
//   const diagnostics: Diagnostic[] = [];
//   while ((m = pattern.exec(text))) {
//     problems++;
//     const diagnostic: Diagnostic = {
//       severity: DiagnosticSeverity.Warning,
//       range: {
//         start: textDocument.positionAt(m.index),
//         end: textDocument.positionAt(m.index + m[0].length),
//       },
//       message: `${m[0]} is all uppercase.`,
//       source: "Diagnostics Demo",
//     };
//     diagnostics.push(diagnostic);
//   }

//   // Send the computed diagnostics to VSCode.
//   connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
// });