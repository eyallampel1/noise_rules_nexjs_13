const fetchMock = jest.fn(() => {
  return {
    ok: true,
    json: () => ({
      success: true,
    }),
  };
});