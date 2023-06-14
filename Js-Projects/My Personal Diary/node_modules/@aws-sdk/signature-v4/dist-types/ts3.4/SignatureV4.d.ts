import {
  AwsCredentialIdentity,
  ChecksumConstructor,
  EventSigner,
  EventSigningArguments,
  FormattedEvent,
  HashConstructor,
  HttpRequest,
  MessageSigner,
  Provider,
  RequestPresigner,
  RequestPresigningArguments,
  RequestSigner,
  RequestSigningArguments,
  SignableMessage,
  SignedMessage,
  SigningArguments,
  StringSigner,
} from "@aws-sdk/types";
export interface SignatureV4Init {
  service: string;
  region: string | Provider<string>;
  credentials: AwsCredentialIdentity | Provider<AwsCredentialIdentity>;
  sha256?: ChecksumConstructor | HashConstructor;
  uriEscapePath?: boolean;
  applyChecksum?: boolean;
}
export interface SignatureV4CryptoInit {
  sha256: ChecksumConstructor | HashConstructor;
}
export declare class SignatureV4
  implements
    RequestPresigner,
    RequestSigner,
    StringSigner,
    EventSigner,
    MessageSigner
{
  private readonly service;
  private readonly regionProvider;
  private readonly credentialProvider;
  private readonly sha256;
  private readonly uriEscapePath;
  private readonly applyChecksum;
  private readonly headerMarshaller;
  constructor({
    applyChecksum,
    credentials,
    region,
    service,
    sha256,
    uriEscapePath,
  }: SignatureV4Init & SignatureV4CryptoInit);
  presign(
    originalRequest: HttpRequest,
    options?: RequestPresigningArguments
  ): Promise<HttpRequest>;
  sign(stringToSign: string, options?: SigningArguments): Promise<string>;
  sign(event: FormattedEvent, options: EventSigningArguments): Promise<string>;
  sign(
    event: SignableMessage,
    options: SigningArguments
  ): Promise<SignedMessage>;
  sign(
    requestToSign: HttpRequest,
    options?: RequestSigningArguments
  ): Promise<HttpRequest>;
  private signEvent;
  signMessage(
    signableMessage: SignableMessage,
    { signingDate, signingRegion, signingService }: SigningArguments
  ): Promise<SignedMessage>;
  private signString;
  private signRequest;
  private createCanonicalRequest;
  private createStringToSign;
  private getCanonicalPath;
  private getSignature;
  private getSigningKey;
  private validateResolvedCredentials;
}
