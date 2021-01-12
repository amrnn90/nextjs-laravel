export function getServerSidePropsWrapper(wrappedFn) {
  return async(ctx) => {
    try {
      return await wrappedFn(ctx)
    } catch(error) {

      if (error.response?.status === 401) {
        return {
          redirect: {
            destination: '/login'
          }
        }
      }
      throw error;
    }
  }

}