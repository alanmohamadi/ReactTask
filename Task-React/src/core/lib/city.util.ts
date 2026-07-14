import cities from "../core/constants/cities.js";
import provinces from "../core/constants/provinces.js";

interface City {
  id: number;
  name: string;
  slug: string;
  province_id: number;
}

interface Province {
  id: number;
  name: string;
  slug: string;
}

export function getAllCities(): City[] {
  return cities;
}

export function getAllProvinces(): Province[] {
  return provinces;
}
export function getProvinceNameById(id: number): string | any {
  return provinces.find((province: Province) => province.id === id)?.name;
}

export function getCitiesByProvinceName(name: string): City[] {
  const province = provinces.find((p) => p.name === name);
  if (!province) return [];
  return cities.filter((city) => city.province_id === province.id);
}

export function getCitiesByProvinceId(id: number): City[] {
  return cities.filter((city: City) => city.province_id === id);
}

export function getCitiesByProvinceSlug(slug: string): City[] {
  const province = provinces.find((p) => p.slug === slug);
  if (!province) return [];
  return cities.filter((city: City) => city.province_id === province.id);
}

export function getCityByName(name: string): City | any {
  return cities.find((city: City) => city.name === name);
}

export function getCityById(id: number): City | any {
  return cities.find((city: City) => city.id === id);
}

export function getCityBySlug(slug: string): City[] {
  return cities.filter((city: City) => city.slug === slug);
}


export function getCityAndProvinceNameByCode(provinceId: number, cityId: number) {
  let cityName: string | any, provinceName: string | any;
  if (provinceId) {
    provinceName = getProvinceNameById(provinceId);
    if (provinceName && cityId) {
      let cityRow = getCityById(cityId);

      if (cityRow.province_id == provinceId) {
        cityName = cityRow.name;
      } else {
      }
    }
  }
  return { provinceName, cityName };
}