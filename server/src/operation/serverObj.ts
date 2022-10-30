
import {
  getFileFsPath,
  getFsPathToUri,
  getPathDepth,
  normalizeFileNameToFsPath,
  normalizeFileNameResolve
} from '../utils/paths';
import {
  DidChangeConfigurationParams,
  DocumentColorParams,
  DocumentFormattingParams,
  DocumentLinkParams,
  FileChangeType,
  Connection,
  TextDocumentPositionParams,
  ColorPresentationParams,
  InitializeParams,
  ServerCapabilities,
  TextDocumentSyncKind,
  DocumentFormattingRequest,
  Disposable,
  DocumentSymbolParams,
  CodeActionParams,
  CompletionParams,
  ExecuteCommandParams,
  FoldingRangeParams,
  RenameFilesParams,
  SemanticTokensParams,
  SemanticTokens,
  SemanticTokensRangeParams,
  SemanticTokensRequest,
  SemanticTokensRangeRequest
} from 'vscode-languageserver';
import {
  ColorInformation,
  CompletionItem,
  CompletionList,
  Definition,
  DocumentHighlight,
  DocumentLink,
  Hover,
  Location,
  SignatureHelp,
  SymbolInformation,
  TextEdit,
  ColorPresentation,
  FoldingRange,
  DocumentUri,
  CodeAction,
  CodeActionKind,
  TextDocumentIdentifier
} from 'vscode-languageserver-types';
import { DocumentService } from "./documentService";
import {  ProjectService } from './serviceProject';
import { nullMode, NULL_HOVER } from '../languageSupport/nullMode';

export class UXS {
  private workspaceConfig: unknown;
  // 返回处理好的document对象
  private documentService: DocumentService;
  // 把接受的参数作用于指向本地
  constructor(private lspConnection: Connection) {
    this.documentService = new DocumentService(this.lspConnection);
  }
  async init(params: InitializeParams) {
    this.setupLSPHandlers();
    this.lspConnection.onShutdown(() => {
      this.dispose();
    });
  }
  //lsp处理函数, 在这里注册所有的监听函数
  setupLSPHandlers() {
    console.log('触发处理函数')
  }
  //关闭lsp处理器回调
  dispose() {

  }
  listen() {
    this.lspConnection.listen();
  }
  // 创建一个获取到具体语言和分区的函数。并把对应的方法转移到具体的监听上。
  async getProjectService(uri: DocumentUri):Promise<ProjectService | undefined>{
    return 
  }
  // 在这里释放所有的监听转发
  async onHover(params: TextDocumentPositionParams): Promise<Hover> {
    // 转发函数处理
    const project = await this.getProjectService(params.textDocument.uri);
    return project?.onHover(params) ?? NULL_HOVER;
  }
}