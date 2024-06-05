import React, { useState, useEffect } from "react";
import axios from "axios";

import "./UpdateLatestNews.scss";

const UpdateLatestNews = () => {
  const [photo, setPhoto] = useState(null);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [loading, setLoading] = useState(true);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoResponse = await axiosInstance.get("/photos");
        const countResponse = await axiosInstance.get("/photos/count");
        const { totalPhotos } = countResponse.data;
        setTotalPhotos(totalPhotos);
        if (photoResponse.data.length > 0) {
          setPhoto(photoResponse.data[0]); // Only display the first photo
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchData();
  }, []);

  return (
    <div className="UpdateLatestNews-container flex justify-center">
      <div className="UpdateLatestNews-wrapper">
        <div className="">
          {!loading ? (
            photo ? (
              <div className="UpdateLatestNews-photo">
                <img src={photo.photo} alt="photo" />
                <span>{photo.subject}</span>
                <span className="UpdateLatestNews-photo-block">
                  {photo.text}
                </span>
                <p>Total Photos: {totalPhotos}</p>
                <a href="/Overview">View Photo</a>
              </div>
            ) : (
              <div className="UpdateLatestNews-photo">
                <img
                  src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png"
                  alt="Avatar"
                />
                <span>No Photo available</span>
                <p>Total Photos: 0</p>
                <a href="/Overview">View Photo</a>
              </div>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="UpdateLatestNews-vid">
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.youtube.com/embed/mUM71vkNooA?si=Q_KM8vXC1Pzmq497"
              title="YouTube video"
              allowFullScreen
            />
          </div>
          <span className="UpdateLatestNews-vid-header">
            🎉 5 Major Steps to Learn Any Language or Anything You Set Your
            Heart On! 🌍
          </span>
          <span className="UpdateLatestNews-vid-text">
            WHY do you want to learn this language? WHAT benefits can it bring?
            Example: English, spoken in 67 countries, opens doors to global
            opportunities with 1.5 billion speakers! 2️⃣ Learn the Basics: Start
            with simple introductions. Focus on basic phrases. Don’t stress
            about mistakes—just build those sentences! 3️⃣ Practice Makes
            Perfect: Sing songs in your target language. Watch movies with
            familiar lines (Yes, even “I’ll be back!”). Join groups and practice
            together. 4️⃣ Implement What You’ve Learned: Engage in speaking
            clubs. Interact with others and showcase your skills. Consistent use
            keeps you motivated and moving forward! 5️⃣ Seek Professional Help
            with SeraSlingo:
          </span>
          <a href="/OverviewVid">Youtube Vid</a>
        </div>
      </div>
    </div>
  );
};

export default UpdateLatestNews;
