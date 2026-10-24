export const withApiErrors = (baseQuery) => async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  const apiError = result.data?.error ?? result.error?.data?.error;
  if (!apiError) return result;

  return {
    error: {
      status: "API_ERROR",
      message: [apiError].flat().join(", "),
    },
  };
};
