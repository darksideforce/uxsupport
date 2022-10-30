// 此文件规定了空调试值和返回值
import { LanguageMode } from '../languageSupport/index';
import { CompletionList } from 'vscode-languageserver-types';

export const NULL_HOVER = {
  contents: []
};

export const NULL_SIGNATURE = null;

export const NULL_COMPLETION: CompletionList = {
  isIncomplete: false,
  items: []
};

// 空的language处理对象
export const nullMode: LanguageMode = {
  getId: () => '',
  doHover: () => NULL_HOVER,
  dispose() {},
};
