import API from '../API';

export const ProcessVideo = async (videoFile) => {
    const formData = new FormData();
    formData.append('file', videoFile);

    const { data } = await API.post('/process', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return data;
};
