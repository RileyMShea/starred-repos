import { Maybe, Repository } from './generated/graphql';

export const pythonOnly = (repository: Maybe<Repository>) => {
  return repository?.primaryLanguage?.name === 'Python';
};
