    //auto binder decorator
    export function AutoBind(
        _target: any,
        _methodName: string,
        descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const adjustedDescriptor: PropertyDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            },
        };
        return adjustedDescriptor;
    }