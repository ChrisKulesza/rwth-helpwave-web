/**
 * @fileoverview gRPC-Web generated client stub for proto.services.task_svc.v1
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.20.3
// source: ward_svc.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as ward_svc_pb from './ward_svc_pb';


export class WardServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorCreateWard = new grpcWeb.MethodDescriptor(
    '/proto.services.task_svc.v1.WardService/CreateWard',
    grpcWeb.MethodType.UNARY,
    ward_svc_pb.CreateWardRequest,
    ward_svc_pb.CreateWardResponse,
    (request: ward_svc_pb.CreateWardRequest) => {
      return request.serializeBinary();
    },
    ward_svc_pb.CreateWardResponse.deserializeBinary
  );

  createWard(
    request: ward_svc_pb.CreateWardRequest,
    metadata: grpcWeb.Metadata | null): Promise<ward_svc_pb.CreateWardResponse>;

  createWard(
    request: ward_svc_pb.CreateWardRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: ward_svc_pb.CreateWardResponse) => void): grpcWeb.ClientReadableStream<ward_svc_pb.CreateWardResponse>;

  createWard(
    request: ward_svc_pb.CreateWardRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: ward_svc_pb.CreateWardResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.services.task_svc.v1.WardService/CreateWard',
        request,
        metadata || {},
        this.methodDescriptorCreateWard,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.services.task_svc.v1.WardService/CreateWard',
    request,
    metadata || {},
    this.methodDescriptorCreateWard);
  }

  methodDescriptorGetWard = new grpcWeb.MethodDescriptor(
    '/proto.services.task_svc.v1.WardService/GetWard',
    grpcWeb.MethodType.UNARY,
    ward_svc_pb.GetWardRequest,
    ward_svc_pb.GetWardResponse,
    (request: ward_svc_pb.GetWardRequest) => {
      return request.serializeBinary();
    },
    ward_svc_pb.GetWardResponse.deserializeBinary
  );

  getWard(
    request: ward_svc_pb.GetWardRequest,
    metadata: grpcWeb.Metadata | null): Promise<ward_svc_pb.GetWardResponse>;

  getWard(
    request: ward_svc_pb.GetWardRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: ward_svc_pb.GetWardResponse) => void): grpcWeb.ClientReadableStream<ward_svc_pb.GetWardResponse>;

  getWard(
    request: ward_svc_pb.GetWardRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: ward_svc_pb.GetWardResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.services.task_svc.v1.WardService/GetWard',
        request,
        metadata || {},
        this.methodDescriptorGetWard,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.services.task_svc.v1.WardService/GetWard',
    request,
    metadata || {},
    this.methodDescriptorGetWard);
  }

  methodDescriptorUpdateWard = new grpcWeb.MethodDescriptor(
    '/proto.services.task_svc.v1.WardService/UpdateWard',
    grpcWeb.MethodType.UNARY,
    ward_svc_pb.UpdateWardRequest,
    ward_svc_pb.UpdateWardResponse,
    (request: ward_svc_pb.UpdateWardRequest) => {
      return request.serializeBinary();
    },
    ward_svc_pb.UpdateWardResponse.deserializeBinary
  );

  updateWard(
    request: ward_svc_pb.UpdateWardRequest,
    metadata: grpcWeb.Metadata | null): Promise<ward_svc_pb.UpdateWardResponse>;

  updateWard(
    request: ward_svc_pb.UpdateWardRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: ward_svc_pb.UpdateWardResponse) => void): grpcWeb.ClientReadableStream<ward_svc_pb.UpdateWardResponse>;

  updateWard(
    request: ward_svc_pb.UpdateWardRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: ward_svc_pb.UpdateWardResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/proto.services.task_svc.v1.WardService/UpdateWard',
        request,
        metadata || {},
        this.methodDescriptorUpdateWard,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/proto.services.task_svc.v1.WardService/UpdateWard',
    request,
    metadata || {},
    this.methodDescriptorUpdateWard);
  }

}
