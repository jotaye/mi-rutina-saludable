import React, { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function Home() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { lang } = useContext(AppContext);

  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const hoy = new Date().getDay();
  const diaHoy = dias[hoy];

  // Definimos la rutina del día con tiempos e instrucciones
  const rutina = {
    lunes: [
      {
        name: "Jumping jacks",
        video: "/assets/jumping-jacks.mov",
        workTime: "00:45",      
        restTime: "00:15",      
        instructions: lang === "es"
          ? "Separa las piernas y brazos, saltando para juntarlos alternadamente. Mantén el core firme."
          : "Jump feet and arms outwards, then back. Keep core tight."
      },
      {
        name: "Flexiones",
        video: "/assets/pushup.mov",
        workTime: "00:40",
        restTime: "00:20",
        instructions: lang === "es"
          ? "Manos a la altura de hombros, cuerpo recto. Flexiona codos hasta casi tocar el suelo."
          : "Hands shoulder-width, keep body straight. Lower until chest almost touches floor."
      },
      {
        name: "Sentadillas",
        video: "/assets/squat.mov",
        workTime: "00:40",
        restTime: "00:20",
        instructions: lang === "es"
          ? "Pies al ancho de hombros, baja glúteos como si te sentaras. Rodillas no pasen la punta de pies."
          : "Feet shoulder-width, push hips back as if sitting. Knees shouldn’t pass toes."
      }
    ],
    martes: [
      {
        name: "Flexiones inclinadas",
        video: "/assets/incline-pushup.mov",
        workTime: "00:40",
        restTime: "00:20",
        instructions: lang === "es"
          ? "Apoya manos en superficie elevada (banca/mesa). Cuerpo recto, flexiona codos."
          : "Hands on elevated surface. Body straight, bend elbows to lower chest."
      },
      {
        name: "Press con pesas",
        video: "/assets/bench-press.mov",
        workTime: "00:45",
        restTime: "00:15",
        instructions: lang === "es"
          ? "En banco plano, agarra barra con manos al ancho de hombros. Baja controlado."
          : "On flat bench, grip bar shoulder-width. Lower in control."
      }
    ],
    miércoles: [
      {
        name: "Sentadillas profundas",
        video: "/assets/deep-squat.mov",
        workTime: "00:40",
        restTime: "00:20",
        instructions: lang === "es"
          ? "Baja hasta que muslos queden paralelos al suelo o más abajo. Mantén pecho erguido."
          : "Descend until thighs parallel or below. Keep chest up."
      },
      {
        name: "Zancadas",
        video: "/assets/lunge.mov",
        workTime: "00:30",  
        restTime: "00:15",
        instructions: lang === "es"
          ? "Da paso amplio, baja rodilla trasera cerca del piso. Alterna pierna."
          : "Take a big step, lower rear knee near floor. Alternate legs."
      }
    ],
    jueves: [
      {
        name: "Dominadas asistidas",
        video: "/assets/assisted-pullup.mov",
        workTime: "00:30",
        restTime: "00:30",
        instructions: lang === "es"
          ? "Usa banda elástica o máquina asistida. Sube con espalda recta y codos pegados."
          : "Use band or machine. Pull up with straight back and elbows close."
      },
      {
        name: "Curl con pesas",
        video: "/assets/bicep-curl.mov",
        workTime: "00:40",
        restTime: "00:20",
        instructions: lang === "es"
          ? "Pies al ancho de hombros. Flexiona codos llevando mancuerna a hombro, sin mover torso."
          : "Feet shoulder-width. Curl weights to shoulders without swinging torso."
      }
    ],
    viernes: [
      {
        name: "Burpees",
        video: "/assets/burpee.mov",
        workTime: "00:45",
        restTime: "00:15",
        instructions: lang === "es"
          ? "Desde pie, baja a plancha, haz push-up, salta con rodillas al pecho y extiéndete."
          : "From standing, drop to plank, do push-up, jump knees to chest, then extend back."
      },
      {
        name: "Sentadillas",
        video: "/assets/squat.mov",
        workTime: "00:40",
        restTime: "00:20",
        instructions: lang === "es"
          ? "Pies al ancho de hombros, baja como si te sentaras, rodillas alineadas con pies."
          : "Feet shoulder-width, sit back, knees aligned with toes."
      },
      {
        name: "Flexiones",
        video: "/assets/pushup.mov",
        workTime: "00:40",
        restTime: "00:20",
        instructions: lang === "es"
          ? "Manos al ancho de hombros, cuerpo en línea recta. Baja controlado."
          : "Hands shoulder-width, body in straight line. Lower with control."
      }
    ],
    sábado: [
      {
        name: "Yoga o movilidad",
        video: "/assets/yoga.mov",
        workTime: "20:00",  
        restTime: "00:00",
        instructions: lang === "es"
          ? "Secuencia suave de estiramientos y posturas para mejorar flexibilidad."
          : "Gentle sequence of stretches and poses to improve flexibility."
      }
    ],
    domingo: [
      {
        name: "Descanso activo",
        video: "/assets/rest.mov",
        workTime: "30:00",  
        restTime: "00:00",
        instructions: lang === "es"
          ? "Caminata ligera o estiramientos suaves para favorecer la recuperación."
          : "Light walk or gentle stretches to aid recovery."
      }
    ]
  };

  const ejercicios = rutina[diaHoy] || [];

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          {lang === "es" ? "Mi rutina de hoy" : "My routine today"} ({diaHoy})
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          {lang === "es" ? "Cerrar sesión" : "Logout"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ejercicios.map((ej, i) => (
          <div
            key={i}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow flex flex-col items-center space-y-2"
          >
            <video
              src={ej.video}
              className="w-full h-40 object-cover rounded mb-2"
              controls
              autoPlay
              loop
              muted
            >
              Tu navegador no soporta reproducir este video.
            </video>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {ej.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {lang === "es" ? "Trabajo:" : "Work:"} {ej.workTime}{" "}
              | {lang === "es" ? "Descanso:" : "Rest:"} {ej.restTime}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              {ej.instructions}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
