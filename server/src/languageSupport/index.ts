import {
  CompletionItem,
  Location,
  SignatureHelp,
  Definition,
  TextEdit,
  Diagnostic,
  DocumentLink,
  Range,
  Hover,
  DocumentHighlight,
  CompletionList,
  Position,
  FormattingOptions,
  SymbolInformation,
  CodeActionContext,
  ColorInformation,
  Color,
  ColorPresentation,
  CodeAction,
  WorkspaceEdit,
  FoldingRange,
  TextDocumentEdit
} from 'vscode-languageserver-types';
import type { TextDocument } from 'vscode-languageserver-textdocument';
import { nullMode } from './nullMode';





export type languageId = 
  'javascript'
  |'css'
  |'ux'

export interface LanguageMode {
  getId(): string;
  updateFileInfo?(doc: TextDocument): void;
  // doValidation?(document: TextDocument, cancellationToken?: VCancellationToken): Promise<Diagnostic[]>;
  // getCodeActions?(
  //   document: TextDocument,
  //   range: Range,
  //   formatParams: FormattingOptions,
  //   context: CodeActionContext
  // ): CodeAction[];
  // doCodeActionResolve?(document: TextDocument, action: CodeAction): CodeAction;
  // doComplete?(document: TextDocument, position: Position): CompletionList;
  // doResolve?(document: TextDocument, item: CompletionItem): CompletionItem;
  doHover?(document: TextDocument, position: Position): Hover;
  // doSignatureHelp?(document: TextDocument, position: Position): SignatureHelp | null;
  // findDocumentHighlight?(document: TextDocument, position: Position): DocumentHighlight[];
  // findDocumentSymbols?(document: TextDocument): SymbolInformation[];
  // findDocumentLinks?(document: TextDocument, documentContext: DocumentContext): DocumentLink[];
  // findDefinition?(document: TextDocument, position: Position): Definition;
  // findReferences?(document: TextDocument, position: Position): Location[];
  // format?(document: TextDocument, range: Range, options: FormattingOptions): TextEdit[];
  // findDocumentColors?(document: TextDocument): ColorInformation[];
  // getColorPresentations?(document: TextDocument, color: Color, range: Range): ColorPresentation[];
  // getFoldingRanges?(document: TextDocument): FoldingRange[];
  // getRenameFileEdit?(renames: FileRename): TextDocumentEdit[];
  // getSemanticTokens?(document: TextDocument, range?: Range): SemanticTokenData[];

  // onDocumentChanged?(filePath: string): void;
  // onDocumentRemoved(document: TextDocument): void;
  dispose(): void;
}
export class LanguageModes{
  private modes : { [k in languageId] : LanguageMode} = {
    css:nullMode,
    ux:nullMode,
    javascript:nullMode,
  }
  init(){}
  getModeAtPosition(document: TextDocument, position: Position): LanguageMode | undefined {
    // const languageId = this.documentRegions.refreshAndGet(document).getLanguageAtPosition(position);
    return this.modes['css'];
  }
} 