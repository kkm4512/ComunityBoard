import { join } from "path";

export const  PROJECT_ROOT_PATH = process.cwd();

export const PUBLIC_FOLDER_NAME = 'public';

export const POSTS_FOLDER_NAME = 'posts';

export const PUBILC_FOLDER_PATH = join(
  PROJECT_ROOT_PATH,
  PUBLIC_FOLDER_NAME
)

export const POST_IMAGE_PATH = join(
  PROJECT_ROOT_PATH,
  PUBLIC_FOLDER_NAME,
  POSTS_FOLDER_NAME
)

export const POST_PUBLIC_IMAGE_PATH = join(
  PUBLIC_FOLDER_NAME,
  POSTS_FOLDER_NAME
)