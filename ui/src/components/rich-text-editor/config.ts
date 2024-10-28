import request from '../../utilities/request/request';

export const uploadImage = async (file: File, uploaded: (src: string) => Promise<void>) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await request<{ url: string }>('/file-uploads', {
    method: 'POST',
    body: formData,
  });

  if (response.ok && response._data) {
    uploaded(response._data.url);
  }
};
