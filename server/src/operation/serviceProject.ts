import {DocumentService} from './documentService'
import {
  CodeAction,
  CodeActionParams,
  ColorInformation,
  ColorPresentation,
  ColorPresentationParams,
  CompletionItem,
  CompletionList,
  CompletionParams,
  CompletionTriggerKind,
  Definition,
  Diagnostic,
  DocumentColorParams,
  DocumentFormattingParams,
  DocumentHighlight,
  DocumentLink,
  DocumentLinkParams,
  DocumentSymbolParams,
  FileRename,
  FoldingRange,
  FoldingRangeParams,
  Hover,
  Location,
  SemanticTokens,
  SemanticTokensBuilder,
  SemanticTokensParams,
  SemanticTokensRangeParams,
  SignatureHelp,
  SymbolInformation,
  TextDocumentEdit,
  TextDocumentPositionParams,
  TextEdit
} from 'vscode-languageserver';
import { LanguageModes } from '../languageSupport';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { NULL_COMPLETION, NULL_HOVER, NULL_SIGNATURE } from '../languageSupport/nullMode';



// 创建一个lsp服务检查对象。把不同分区的服务在此处理
export interface ProjectService{
  onHover(params: TextDocumentPositionParams): Promise<Hover>;  
}
//方法，对不同分区进行划分，把指定的函数处理到规定的
export async function createProjectService(
  documentService: DocumentService,
):Promise<ProjectService>{
  const languageModes = new LanguageModes();
  return {
    async onHover({textDocument,position}){
      // 传递指定对象
      const doc = documentService.getDocument(textDocument.uri)!;
      const mode = languageModes.getModeAtPosition(doc, position);
      if (mode && mode.doHover) {
        return mode.doHover(doc, position);
      }
      return NULL_HOVER;
    }
  }
}