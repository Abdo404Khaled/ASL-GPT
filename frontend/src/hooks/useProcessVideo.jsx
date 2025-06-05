import { useMutation } from '@tanstack/react-query';
import { ProcessVideo } from '../api/endpoints/process.js';

export default function useProcessVideo(options = {}) {
  return useMutation({
    mutationFn: ProcessVideo,
    ...options,
  });
}
