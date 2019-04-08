import Context from "@interfaces/Context";

const Subscription = {
  call: {
    subscribe(
      _parent: any,
      _args: any,
      { pubSub }: Context,
    ): AsyncIterator<{}> {
      return pubSub.asyncIterator("calls");
    },
  },
};

export default Subscription;
