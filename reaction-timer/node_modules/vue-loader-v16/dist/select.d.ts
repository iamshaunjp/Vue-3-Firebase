/// <reference types="node" />
import webpack from 'webpack';
import { SFCDescriptor } from '@vue/compiler-sfc';
import { ParsedUrlQuery } from 'querystring';
export declare function selectBlock(descriptor: SFCDescriptor, loaderContext: webpack.loader.LoaderContext, query: ParsedUrlQuery, appendExtension: boolean): void;
