import { useEffect, useState } from "react";
import { GetComponent } from "../../../apis/components/component";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../../components/Loader/Loading";
import styles from "./ListCompo.module.scss";
import { useForm } from "react-hook-form";

export default function ListCompo() {
  const [loader, setLoader] = useState(true);
  const [component, setComponent] = useState([]);

  const yupSchema = yup.object({
    name: yup.string(),
    codename: yup.string(),
    price: yup.string(),
    date: yup.string(),
    brand: yup.string(),
    socket: yup.string(),
    litho: yup.string(),
    core: yup.string(),
    thread: yup.string(),
    cache: yup.string(),
    clock: yup.string(),
    maxclock: yup.string(),
    bus: yup.string(),
    memory: yup.string(),
    maxMemory: yup.string(),
    bandwithMemory: yup.string(),
    channelMemory: yup.string(),
    ECCMemory: yup.string(),
    itg: yup.string(),
    itgFreq: yup.string(),
    itgMaxFreq: yup.string(),
    itgMaxMem: yup.string(),
    itg4k: yup.string(),
    tdp: yup.string(),
    maxTemp: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  //   Get the component
  useEffect(() => {
    setLoader(true);
    async function Component() {
      GetComponent().then((c) => {
        setComponent(c);
        setLoader(false);
      });
    }
    Component();
  }, []);

  //   Debug
  useEffect(() => {
    console.log(component);
  }, [component]);

  function HandleClick() {}

  async function submit(values) {
    console.log(values);
  }

  return (
    <>
      {loader ? (
        <div className={`${styles.Loading}`}>
          <Loading />
        </div>
      ) : (
        <>
          <div>
            <h2>ListCompo</h2>
            {component ? (
              <>
                <ul className={`d-flex flex-column ${styles.ListContainer}`}>
                  {component.map((c) => (
                    <li key={c.idComponent} className="d-flex flex-fill my20">
                      <img
                        className="mx10"
                        src={c.ComponentImage}
                        alt={c.idComponent}
                      />
                      <ul className="d-flex flex-fill flex-column">
                        <li>Id : {c.idCPU}</li>
                        <li>Name : {c.ComponentName}</li>
                        <li>CodeName : {c.CPUcodeName}</li>
                        <li>Price : {c.CPUprice}</li>
                        <li>Date : {c.CPUreleaseDate}</li>
                        <li>Brand : {c.CPUbrand}</li>
                        <li>Socket : {c.CPUSockets}</li>
                        <li>Lithographie : {c.CPUlithograph}</li>
                        <li>CoreCount : {c.CPUcoreCount}</li>
                        <li>Thread Count: {c.CPUthreadCount}</li>
                        <li>Cache : {c.CPUcache}</li>
                        <li>ClockSpeed : {c.CPUclockSpeed}</li>
                        <li>Max clockSpeed : {c.CPUmaxClockSpeed}</li>
                        <li>bus : {c.CPUbus}</li>
                        <li>Memory Type: {c.CPUtypeMemory}</li>
                        <li>Max Memory : {c.CPUmaxMemory}</li>
                        <li>Memory Bandwith: {c.CPUmaxMemoryBandwidth}</li>
                        <li>
                          Number of Memory Channel: {c.CPUnumberMemoryChannel}
                        </li>
                        <li> Support ECC memory: {c.CPUsupportECCMemory}</li>
                        <li>IntegratedGraphic : {c.CPUitgdGraphic}</li>
                        <li>IntegratedGraphic Freq : {c.CPUitgdGraphicFreq}</li>
                        <li>
                          IntegratedGraphic Max Freq : {c.CPUitgdGraphicMaxFreq}
                        </li>
                        <li>
                          IntegratedGraphic Max Memory :{" "}
                          {c.CPUitgdGraphicMaxMemory}
                        </li>
                        <li>
                          IntegratedGraphic 4k support :{" "}
                          {c.CPUitgdGraphicSupport4K}
                        </li>
                        <li>TDP: {c.CPUmaxTDP}</li>
                        <li>Max Temp: {c.CPUmaxTemp}</li>
                      </ul>
                      <button
                        className="mx10"
                        type="button"
                        onClick={HandleClick}
                      >
                        Edit
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>Pas de components</>
            )}
          </div>
          <div
            className={`${styles.Insert} d-flex flex-column justify-content-center align-items-center`}
          >
            <form onSubmit={handleSubmit(submit)}>
              <div>
                <img />
                <h2>Id : hfidhfidh</h2>
              </div>
              <div
                className={`d-flex justify-content-center align-items-center`}
              >
                <div className="d-flex flex-column">
                  <label>Name</label>
                  <input type="text" {...register("name")}></input>
                  <label>CodeName</label>
                  <input type="text" {...register("codename")}></input>
                  <label>Price</label>
                  <input type="text" {...register("price")}></input>
                  <label>Date</label>
                  <input type="text" {...register("date")}></input>
                  <label>Brand</label>
                  <input type="text" {...register("brand")}></input>
                  <label>Socket</label>
                  <input type="text" {...register("socket")}></input>
                  <label>Lithoragphie</label>
                  <input type="text" {...register("litho")}></input>
                  <label>CoreCount</label>
                  <input type="text" {...register("core")}></input>
                  <label>ThreadCount</label>
                  <input type="text" {...register("thread")}></input>
                  <label>Cache</label>
                  <input type="text" {...register("cache")}></input>
                  <label>ClockSpeed</label>
                  <input type="text" {...register("clock")}></input>
                  <label>Max ClockSpeed</label>
                  <input type="text" {...register("maxclock")}></input>
                  <label>Bus</label>
                  <input type="text" {...register("bus")}></input>
                </div>
                <div className="d-flex flex-column mx10">
                  <label>Memory Type</label>
                  <input type="text" {...register("memory")}></input>
                  <label>Max Memory</label>
                  <input type="text" {...register("maxMemory")}></input>
                  <label>Memory Bandwith</label>
                  <input type="text" {...register("bandwithMemory")}></input>
                  <label>Number of Memory Channel</label>
                  <input type="text" {...register("channelMemory")}></input>
                  <label>Support ECC memory</label>
                  <input type="text" {...register("ECCMemory")}></input>
                  <label>Integraded Graphic</label>
                  <input type="text" {...register("itg")}></input>
                  <label>Integraded Graphic Freq</label>
                  <input type="text" {...register("itgFreq")}></input>
                  <label>Integraded Graphic Max Freq</label>
                  <input type="text" {...register("itgMaxFreq")}></input>
                  <label>Integraded Graphic Max memory</label>
                  <input type="text" {...register("itgMaxMem")}></input>
                  <label>Integraded Graphic 4k support </label>
                  <input type="text" {...register("itg4k")}></input>
                  <label>TDP</label>
                  <input type="text" {...register("tdp")}></input>
                  <label>Max Temp</label>
                  <input type="text" {...register("maxTemp")}></input>
                </div>
              </div>
              <div className="d-flex flex-content-end">
                <button type="button">Cancel</button>
                <button>Save</button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
