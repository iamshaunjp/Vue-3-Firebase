import webpack from 'webpack';
declare class VueLoaderPlugin implements webpack.Plugin {
    static NS: string;
    apply(compiler: webpack.Compiler): void;
}
export default VueLoaderPlugin;
