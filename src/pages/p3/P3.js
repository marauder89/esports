import { useRef, useEffect, useState, useCallback, Fragment } from "react";
import { useForm } from "react-hook-form";
import { default as _ } from "lodash";
import { Slider } from "@mui/material";
import moment from "moment";

import FastRewindIcon from "@mui/icons-material/FastRewind";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import FastForwardIcon from "@mui/icons-material/FastForward";
import IconButton from "@mui/material/IconButton";

import { loadImage } from "../../commons";
import { Footprints, Stats } from "../../components";
import { GPG_1_1, GPG_1_2, GPG_1_3 } from "../../services";

const P3 = () => {
  const canvas = useRef();
  const map = useRef();
  const interval = useRef();
  const { register, handleSubmit, setFocus } = useForm();
  const [tierList, setTierList] = useState([{ name: "None", value: "" }]);
  const [groupList, setGroupList] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [slideData, setSlideData] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [play, setPlay] = useState(false);

  const versionList = [
    { name: "None", value: "" },
    { name: "11.13", value: 11.13 },
    { name: "11.14", value: 11.14 },
    { name: "11.15", value: 11.15 },
    { name: "11.16", value: 11.16 },
    { name: "11.17", value: 11.17 },
    { name: "11.18", value: 11.18 },
  ];

  useEffect(() => {
    setFocus("version");
  }, [setFocus]);

  useEffect(() => {
    if (play) {
      const sliderIndex = _.findIndex(slideData, (data) => data.time === sliderValue);
      interval.current = setInterval(() => {
        if (sliderIndex < slideData.length - 1 && 0 < slideData.length) {
          setSliderValue(slideData[sliderIndex + 1].time);
        } else if (sliderIndex === slideData.length - 1) {
          setPlay(false);
        }
      }, 1000);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [play, sliderValue, slideData]);

  useEffect(() => {
    if (selectedGroup !== "" && profiles.length > 0) {
      const getGPG_1_3 = async () => {
        const params = {
          group: selectedGroup,
          profiles: profiles,
        };

        const _footprintData = await GPG_1_3(params);
        const representativeFootprint = _footprintData.representative_footprint;
        const _slideData = [{ time: 0, x: 20, y: 490 }]; //시작좌표

        Object.keys(representativeFootprint).forEach((key) => {
          const width = 512;
          const height = 512;
          const xPos = representativeFootprint[key][0];
          const yPos = representativeFootprint[key][1];

          const drawX = width * xPos;
          const drawY = height - height * yPos;
          const time = Number(key.split("_")[1]);

          _slideData.push({ time: time, x: drawX, y: drawY });
        });
        setSlideData(_slideData);
      };
      getGPG_1_3();
    }
  }, [selectedGroup, profiles]);

  useEffect(() => {
    if (canvas.current) {
      loadImage("img/map/map11.png").then((img) => {
        const ctx = canvas.current.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const sliderIndex = _.findIndex(slideData, (data) => data.time === sliderValue);
        const viewProfiles = slideData.filter((_, index) => index < sliderIndex + 1);

        ctx.beginPath();

        viewProfiles.forEach((data) => {
          ctx.lineTo(data.x, data.y);
        });

        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.stroke();

        const base64 = canvas.current.toDataURL();
        map.current.src = base64;
      });
    }
  }, [sliderValue, slideData]);

  const onSubmit = (form) => {
    const getGPG_1_2 = async () => {
      const _profileData = await GPG_1_2(form);

      setGroupList(() => _profileData.index);
      setSelectedGroup(_profileData.index[0]);
      setProfiles(_profileData.profiles);
    };
    getGPG_1_2();
  };

  const onError = useCallback((errors, e) => {
    const field = Object.keys(errors)[0];
    alert(errors[field].message);
  }, []);

  const onPlayBoxClick = useCallback(
    (value) => {
      const sliderIndex = _.findIndex(slideData, (data) => data.time === sliderValue);
      switch (value) {
        case "play":
          setPlay(true);
          break;
        case "pause":
          setPlay(false);
          break;
        case "stop":
          setPlay(false);
          setSliderValue(0);
          break;
        case "fastRewind":
          setPlay(false);
          if (0 < sliderIndex && 0 < slideData.length) {
            setSliderValue(slideData[sliderIndex - 1].time);
          }
          break;
        case "fastForward":
          setPlay(false);
          if (sliderIndex < slideData.length - 1 && 0 < slideData.length) {
            setSliderValue(slideData[sliderIndex + 1].time);
          }
          break;
        default:
          break;
      }
    },
    [slideData, sliderValue]
  );

  const onSliderChange = useCallback((e, value) => {
    setSliderValue(value);
  }, []);

  const sliderValueFormatter = useCallback((value) => {
    const minute = (value / 60) | 0;
    const second = value % 60 | 0;

    return moment(0).minute(minute).second(second).format("mm:ss");
  }, []);

  const onGroupChange = useCallback((e) => {
    setSelectedGroup(e.target.value);
  }, []);

  const onChangeVersion = useCallback((el) => {
    const selected = el.target.value;

    if (selected === "") {
      setTierList([{ name: "None", value: "" }]);
    } else {
      const getGPG_1_1 = async () => {
        const params = {
          version: selected,
        };
        const _tierList = await GPG_1_1(params);
        setTierList([
          { name: "None", value: "" },
          ..._tierList.tier.map((tier) => {
            return { name: tier, value: tier };
          }),
        ]);
      };
      getGPG_1_1();
    }
  }, []);

  return (
    <Fragment>
      <section>
        <div className="container p-0">
          <div className="row equal-cols">
            <div className="col-md-6">
              <div className="mapDataList m-3 p-4 rounded bg border">
                <div className="mapSelect">
                  <label htmlFor="groupSelect">Group</label>
                  <select className="form-select" value={selectedGroup} disabled={groupList.length < 1} onChange={onGroupChange}>
                    {groupList.map((group, index) => {
                      return (
                        <option key={index} value={group}>
                          {group}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mapMove mt-3">
                  <img ref={map} src="img/map/map11.png" alt="map" />
                  <canvas ref={canvas} width="512" height="512" hidden />
                  <Slider
                    step={20}
                    value={sliderValue}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    getAriaValueText={sliderValueFormatter}
                    valueLabelFormat={sliderValueFormatter}
                    onChange={onSliderChange}
                    max={slideData.length > 0 ? slideData[slideData.length - 1].time : 0}
                    disabled={groupList.length < 1}
                  />
                  <div className="play-box">
                    <IconButton aria-label="fastRewindIcon" onClick={() => onPlayBoxClick("fastRewind")} disabled={groupList.length < 1}>
                      <FastRewindIcon color={groupList.length < 1 ? "disabled" : "primary"} />
                    </IconButton>
                    <IconButton aria-label="playIcon" onClick={() => onPlayBoxClick("play")} hidden={play} disabled={groupList.length < 1}>
                      <PlayArrowIcon color={groupList.length < 1 ? "disabled" : "primary"} />
                    </IconButton>
                    <IconButton aria-label="pauseIcon" onClick={() => onPlayBoxClick("pause")} hidden={!play} disabled={groupList.length < 1}>
                      <PauseIcon color={groupList.length < 1 ? "disabled" : "primary"} />
                    </IconButton>
                    <IconButton aria-label="stopIcon" onClick={() => onPlayBoxClick("stop")} disabled={groupList.length < 1}>
                      <StopIcon color={groupList.length < 1 ? "disabled" : "primary"} />
                    </IconButton>
                    <IconButton aria-label="fastForwardIcon" onClick={() => onPlayBoxClick("fastForward")} disabled={groupList.length < 1}>
                      <FastForwardIcon color={groupList.length < 1 ? "disabled" : "primary"} />
                    </IconButton>
                  </div>
                </div>
                <Stats profiles={profiles} selectedGroup={selectedGroup} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mapSearch m-3 p-4 rounded bg border">
                <div className="searchForm">
                  <form>
                    <div className="searchSelect">
                      <label htmlFor="versionSelect">Version</label>
                      <select className="form-select" defaultValue={""} {...register("version", { required: "버전을 선택해 주세요.", onChange: onChangeVersion })}>
                        {versionList.map((version, index) => {
                          return (
                            <option key={index} value={version.value}>
                              {version.name}
                            </option>
                          );
                        })}
                      </select>
                      <label htmlFor="tierSelect">Tier</label>
                      <select className="form-select" defaultValue={""} {...register("tier", { required: "티어를 선택해 주세요." })}>
                        {tierList.map((tier, index) => {
                          return (
                            <option key={index} value={tier.value}>
                              {tier.name}
                            </option>
                          );
                        })}
                      </select>
                      <button type="button" className="btn btn_blue2" onClick={handleSubmit(onSubmit, onError)}>
                        프로파일분류
                      </button>
                    </div>
                    <div className="searchRadio mt-3">
                      <div className="teamGroup">
                        <span className="">Team</span>
                        <input type="radio" className="btn-check" name="team" id="option1" {...register("team", { required: true })} autoComplete="off" defaultValue={"blue"} defaultChecked />
                        <label className="btn btn-secondary" htmlFor="option1">
                          Blue
                        </label>
                        <input type="radio" className="btn-check" name="team" id="option2" {...register("team", { required: true })} autoComplete="off" defaultValue={"purple"} />
                        <label className="btn btn-secondary btn-right" htmlFor="option2">
                          Purple
                        </label>
                      </div>
                      <div className="positionGroup">
                        <span className="">Position</span>
                        <input
                          type="radio"
                          className="btn-check"
                          name="position"
                          id="option3"
                          {...register("position", { required: true })}
                          autoComplete="off"
                          defaultValue={"jungle"}
                          defaultChecked
                        />
                        <label className="btn btn-secondary" htmlFor="option3">
                          Jungle
                        </label>
                        <input type="radio" className="btn-check" name="position" id="option4" {...register("position", { required: true })} autoComplete="off" defaultValue={"middle"} />
                        <label className="btn btn-secondary btn-right" htmlFor="option4">
                          Middle
                        </label>
                      </div>
                      <div className="featureGroup">
                        <span className="">Feature</span>
                        <input
                          type="radio"
                          className="btn-check"
                          name="feature"
                          id="option5"
                          {...register("feature", { required: true })}
                          autoComplete="off"
                          defaultValue={"win_rate"}
                          defaultChecked
                        />
                        <label className="btn btn-secondary" htmlFor="option5">
                          Win rate
                        </label>
                        <input type="radio" className="btn-check" name="feature" id="option6" {...register("feature", { required: true })} autoComplete="off" defaultValue={"kda"} />
                        <label className="btn btn-secondary btn-right" htmlFor="option6">
                          K/D/A
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
                <hr />
                <div className="resultMap">
                  <Footprints profiles={profiles} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default P3;
