import * as styles from "./LocationModal.css";
import locationDatas from "./locationDatas.json";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import { toggleLocationModal } from "../../../store/modalStore";
import { FavoriteLocation, useUserInfoStore } from "../../../store/userInfoStore";
import {
  addServerFavoriteLocation,
  deleteServerFavoriteLocation,
  putCurrentLocation,
} from "../../../apis/locationAPIs";

const FAVORITE_MAX_COUNT = 5;

const LocationModal = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    sido: "",
    sigungu: "",
  });
  const { favoriteLocations, currentLocation } = useUserInfoStore((state) => ({
    favoriteLocations: state.favoriteLocations,
    currentLocation: state.currentLocation,
  }));

  const { addFavoriteLocation, deleteFavoriteLocation, setCurrentLocation } = useUserInfoStore((state) => ({
    addFavoriteLocation: state.actions.addFavoriteLocation,
    deleteFavoriteLocation: state.actions.deleteFavoriteLocation,
    setCurrentLocation: state.actions.setCurrentLocation,
  }));

  const handleSidoChange = (e) => {
    if (e.target.value === "") {
      return;
    }
    setSelectedLocation({ ...selectedLocation, sido: e.target.value, sigungu: "" });
  };

  const handleSigunguChange = async (e) => {
    if (e.target.value === "") {
      return;
    }

    setSelectedLocation({ ...selectedLocation, sigungu: e.target.value });

    await putCurrentLocation(`${selectedLocation.sido} ${e.target.value}`);
    setCurrentLocation(`${selectedLocation.sido} ${e.target.value}`);
  };

  const handleAddFavorite = async () => {
    if (favoriteLocations.length < FAVORITE_MAX_COUNT) {
      await addServerFavoriteLocation(currentLocation);
      addFavoriteLocation(currentLocation);

      return;
    }

    alert(`즐겨찾기는 최대 ${FAVORITE_MAX_COUNT}개까지 가능합니다.`);
  };

  const isCurrentInFavorites = (favoriteLocations: FavoriteLocation[], currentLocation: string) => {
    return !(
      favoriteLocations.filter(
        (favoriteLocation: FavoriteLocation) => favoriteLocation.location_name === currentLocation,
      ).length === 0
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <div className={styles.title}>지역 선택</div>
          <FiX className={styles.closeButton} onClick={toggleLocationModal} />
        </div>

        <select name="sido" className={styles.selectBox} value={selectedLocation.sido} onChange={handleSidoChange}>
          <option value="">시/도 선택</option>
          {locationDatas.map((data) => (
            <option value={data.name}>{data.name}</option>
          ))}
        </select>

        <select
          name="sigungu"
          className={styles.selectBox}
          value={selectedLocation.sigungu}
          onChange={handleSigunguChange}
        >
          <option value="">시/군/구 선택</option>
          {locationDatas.map((data) =>
            data.name === selectedLocation.sido
              ? data.subArea.map((subAreaData) => (
                  <option key={subAreaData} value={subAreaData}>
                    {subAreaData}
                  </option>
                ))
              : null,
          )}
        </select>

        <div className={styles.favoriteArea}>
          <div className={styles.subTitle}>즐겨찾기한 위치</div>
          {favoriteLocations.map((location: FavoriteLocation, index) => (
            <div key={index} className={styles.locationItem}>
              {location.location_name}
              <TiStarFullOutline
                className={styles.starFilledIcon}
                onClick={async (e) => {
                  try {
                    await deleteServerFavoriteLocation(location.location_name);
                    deleteFavoriteLocation(location.location_name);
                  } catch (err) {}
                  // e.stopPropagation();
                }}
              />
            </div>
          ))}
        </div>

        <div className={styles.currentLocationArea}>
          <div className={styles.subTitle}>현재 위치</div>
          <div className={styles.locationItem}>
            {currentLocation}
            {isCurrentInFavorites(favoriteLocations, currentLocation) ? (
              <TiStarFullOutline
                className={styles.starFilledIcon}
                onClick={async () => {
                  try {
                    await deleteServerFavoriteLocation(currentLocation);
                    deleteFavoriteLocation(currentLocation);
                  } catch (err) {}
                }}
              />
            ) : (
              <TiStarOutline className={styles.starEmptyIcon} onClick={handleAddFavorite} />
            )}
          </div>
        </div>
        <button type="button" className={styles.okButton} onClick={toggleLocationModal}>
          확인
        </button>
      </div>
    </div>
  );
};

export default LocationModal;
