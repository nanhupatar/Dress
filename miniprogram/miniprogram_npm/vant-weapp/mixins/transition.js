import { isObj } from '../common/utils';
const getClassNames = (name) => ({
    enter: `van-${name}-enter van-${name}-enter-active enter-class enter-active-class`,
    'enter-to': `van-${name}-enter-to van-${name}-enter-active enter-to-class enter-active-class`,
    leave: `van-${name}-leave van-${name}-leave-active leave-class leave-active-class`,
    'leave-to': `van-${name}-leave-to van-${name}-leave-active leave-to-class leave-active-class`
});
const requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60);
export const transition = function (showDefaultValue) {
    return Behavior({
        properties: {
            customStyle: String,
            show: {
                type: Boolean,
                value: showDefaultValue,
                observer: 'observeShow'
            },
            duration: {
                type: [Number, Object],
                value: 300,
                observer: 'observeDuration'
            },
            name: {
                type: String,
                value: 'fade',
                observer: 'updateClasses'
            }
        },
        data: {
            type: '',
            inited: false,
            display: false,
            classNames: getClassNames('fade')
        },
        attached() {
            if (this.data.show) {
                this.show();
            }
        },
        methods: {
            observeShow(value) {
                if (value) {
                    this.show();
                }
                else {
                    this.leave();
                }
            },
            updateClasses(name) {
                this.set({
                    classNames: getClassNames(name)
                });
            },
            show() {
                const { classNames, duration } = this.data;
                this.set({
                    inited: true,
                    display: true,
                    classes: classNames.enter,
                    currentDuration: isObj(duration) ? duration.enter : duration
                }).then(() => {
                    requestAnimationFrame(() => {
                        this.set({
                            classes: classNames['enter-to']
                        });
                    });
                });
            },
            leave() {
                const { classNames, duration } = this.data;
                this.set({
                    classes: classNames.leave,
                    currentDuration: isObj(duration) ? duration.leave : duration
                }).then(() => {
                    requestAnimationFrame(() => {
                        this.set({
                            classes: classNames['leave-to']
                        });
                    });
                });
            },
            onTransitionEnd() {
                if (!this.data.show) {
                    this.set({ display: false });
                }
            }
        }
    });
};
