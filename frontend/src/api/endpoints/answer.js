import API from '../API';

export const AnswerQuery = async (query) => {
  const res = await API.post(
    '/answer',
    { query },
    {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'arraybuffer',
    }
  );

  const contentType = res.headers['content-type'] || ''

  if (contentType.includes('application/pdf')) {
    const blob = new Blob([res.data], { type: 'application/pdf' })
    return { blob }
  } else {
    const text = new TextDecoder('utf-8').decode(res.data)
    return JSON.parse(text)
  }
}