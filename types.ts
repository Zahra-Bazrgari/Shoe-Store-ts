export interface MySwiperOptions {
  slidesPerView: string | number;
  loop: boolean;
  navigation: {
    nextEl: string;
    prevEl: string;
  };
  on?: {
    slideChange?: () => void;
  };
}

export interface AuthData {
  username: string;
  password: string;
  [key: string]: any;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface HttpError {
  response: {
    data: {
      message: string | string[];
      statusCode?: number;
    }
    status: number;
  };
}


export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export interface AuthData {
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface Sneaker {
  id: string;
  name: string;
  imageURL: string;
  price: number;
  brand: string;
  // sizes?: string[];
  // colors?: string[];
}

export type SessionToken = string | null;

export type NullableElement = HTMLElement | null;
