export function mockFetchSuccess(success: boolean, data: any) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: success,
      json: () => data,
    })
  );
}

export function mockFetchFail(data: any) {
  return jest.fn().mockImplementation(() =>
    Promise.reject({
      ok: false,
      json: () => data,
    })
  );
}
