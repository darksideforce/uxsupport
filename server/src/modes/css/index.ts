import {
  getCSSLanguageService,
  getSCSSLanguageService,
  getLESSLanguageService,
  LanguageService
} from 'vscode-css-languageservice';

export function getCSSMode(
  env: EnvironmentService,
  documentRegions: LanguageModelCache<VueDocumentRegions>,
  dependencyService: DependencyService
): LanguageMode {
  const languageService = getCSSLanguageService();
  return getStyleMode(env, 'css', languageService, documentRegions, dependencyService);
}