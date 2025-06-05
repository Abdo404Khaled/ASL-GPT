import { useMutation } from '@tanstack/react-query';
import { AnswerQuery } from '../api/endpoints/answer.js';

export default function useAnswerQuery(options = {}) {
  return useMutation({
    mutationFn: AnswerQuery,
    ...options,
  });
}
