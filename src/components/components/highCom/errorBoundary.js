/*
* 页面出错，降级提示
* */
import React, { Component } from "react";

const ErrorBoundary = (WrappedComponent) => {
    return class Wrap extends Component {
        state = {
            hasError: false,
        };
        static getDerivedStateFromError(err) {
            return {
                hasError: true,
                err
            };
        }

        componentDidCatch(err, info) {
            console.log(err, info);
        }

        render() {
            return (
                this.state.hasError ?
                    <div style={{margin: '24px 0'}}>页面错误，请尝试刷新</div>
                        :
                    <WrappedComponent {...this.props} />
            );
        }
    }
}
export default ErrorBoundary