/**
 * 获取静态资源路径
 * @param name
 * @param folder
 */
export default function getAssetUrl(name: string, folder: string = 'images') {
  return new URL(`../../assets/${folder}/${name}`, import.meta.url).href;
}
