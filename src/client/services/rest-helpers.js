export const parseJson = res => {
  if (res.status !== 200)
    return res.json().then(json => {
      throw new Error(json.details || json.message);
    });
  else return res.json();
};
