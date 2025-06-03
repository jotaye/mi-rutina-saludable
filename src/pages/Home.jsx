import React, { useContext, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function Home() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { lang } = useContext(AppContext);

  // ╔══╗ Días de la semana
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const hoy = new Date().getDay();
  const diaHoy = dias[hoy];

  // ╔══╗ Estado de nivel: "beginner", "intermediate" o "advanced"
  const [level, setLevel] = useState("beginner");

  // ╔══╗ Rutinas con tiempos e instrucciones para cada nivel
  const rutina = {
    beginner: {
      lunes: [
        {
          name: "Jumping jacks",
          video: "/assets/jumping-jacks.mov",
          workTime: "00:30",
          restTime: "00:30",
          instructions: lang === "es"
            ? "Párese con los pies juntos y brazos a los lados. Salte separando las piernas y llevando los brazos por encima de la cabeza, luego vuelva a la posición inicial."
            : "Stand with feet together and arms at sides. Jump feet outward while raising arms overhead, then return to start."
        },
        {
          name: "Flexiones modificadas",
          video: "/assets/pushup.mov",
          workTime: "00:30",
          restTime: "00:30",
          instructions: lang === "es"
            ? "Apoye las rodillas en el suelo y mantenga la espalda recta. Baje el pecho hasta casi tocar el piso, luego suba suavemente."
            : "Knees on the floor, keep back straight. Lower chest until just above the floor, then push up gently."
        },
        {
          name: "Sentadillas con apoyo",
          video: "/assets/squat.mov",
          workTime: "00:30",
          restTime: "00:30",
          instructions: lang === "es"
            ? "Utilice una silla para apoyo si lo necesita. Baje caderas como si fuera a sentarse, mantenga pecho erguido y rodillas alineadas."
            : "Use a chair for support if needed. Lower hips as if sitting, keep chest upright and knees aligned."
        }
      ],
      martes: [
        {
          name: "Flexiones inclinadas",
          video: "/assets/incline-pushup.mov",
          workTime: "00:30",
          restTime: "00:30",
          instructions: lang === "es"
            ? "Coloque las manos sobre una superficie elevada (mesa, banco). Mantenga el cuerpo recto y baje lentamente."
            : "Place hands on an elevated surface (bench, table). Keep body straight and lower slowly."
        },
        {
          name: "Press con mancuernas sentado",
          video: "/assets/bench-press.mov",
          workTime: "00:35",
          restTime: "00:25",
          instructions: lang === "es"
            ? "Siéntese en un banco con respaldo. Con mancuernas pequeñas, empuje hacia arriba hasta extender los brazos, luego baje controlado."
            : "Sit on a bench with back support. With light dumbbells, push up until arms are extended, then lower in control."
        }
      ],
      miércoles: [
        {
          name: "Sentadillas profundas guiadas",
          video: "/assets/deep-squat.mov",
          workTime: "00:30",
          restTime: "00:30",
          instructions: lang === "es"
            ? "Con apoyo en la pared o silla, baje hasta que los muslos queden paralelos al suelo o un poco más abajo, manteniendo el pecho erguido."
            : "Using wall or chair for support, squat until thighs are parallel (or slightly below), keeping chest upright."
        },
        {
          name: "Zancadas asistidas",
          video: "/assets/lunge.mov",
          workTime: "00:25",
          restTime: "00:35",
          instructions: lang === "es"
            ? "Sosténgase de una silla. Dé un paso adelante, baje la rodilla trasera cerca del suelo sin que toque, luego regrese."
            : "Hold onto a chair. Step forward, lower back knee near floor without touching it, then return."
        }
      ],
      jueves: [
        {
          name: "Dominadas asistidas (banda)",
          video: "/assets/assisted-pullup.mov",
          workTime: "00:25",
          restTime: "00:35",
          instructions: lang === "es"
            ? "Use una banda elástica para ayudar. Agarre la barra con manos al ancho de hombros, jale el pecho hasta la barra, baje despacio."
            : "Use a resistance band for assistance. Grip bar shoulder-width, pull chest toward bar, lower slowly."
        },
        {
          name: "Curl de bíceps con mancuernas",
          video: "/assets/bicep-curl.mov",
          workTime: "00:30",
          restTime: "00:30",
          instructions: lang === "es"
            ? "Pies al ancho de hombros. Con mancuernas ligeras, flexione codos llevando el peso a los hombros sin balancear el torso."
            : "Feet shoulder-width. With light dumbbells, curl toward shoulders without swinging torso."
        }
      ],
      viernes: [
        {
          name: "Burpees simplificados",
          video: "/assets/burpee.mov",
          workTime: "00:30",
          restTime: "00:30",
          instructions: lang === "es"
            ? "Sin salto final. Desde pie, baje a posición de plancha, haga una flexión simplificada, regrese a pie."
            : "No final jump. From standing, drop to plank, do a simplified push-up, return to standing."
        },
        {
          name: "Sentadillas con apoyo",
          video: "/assets/squat.mov",
          workTime: "00:30",
          restTime: "00:30",
          instructions: lang === "es"
            ? "Igual que el lunes: use una silla si lo necesita y baje lentamente manteniendo el pecho erguido."
            : "Same as Monday: use a chair if needed and lower slowly while keeping chest up."
        },
        {
          name: "Flexiones modificadas",
          video: "/assets/pushup.mov",
          workTime: "00:30",
          restTime: "00:30",
          instructions: lang === "es"
            ? "Misma técnica del lunes: rodillas en el suelo, cuerpo recto y baje controlado."
            : "Same technique as Monday: knees on floor, back straight, lower with control."
        }
      ],
      sábado: [
        {
          name: "Yoga suave y movilidad",
          video: "/assets/yoga.mov",
          workTime: "15:00",
          restTime: "00:00",
          instructions: lang === "es"
            ? "Secuencia de estiramientos suaves y posturas básicas para relajar y mejorar la flexibilidad."
            : "Gentle sequence of stretches and basic poses to relax and improve flexibility."
        }
      ],
      domingo: [
        {
          name: "Descanso activo",
          video: "/assets/rest.mov",
          workTime: "20:00",
          restTime: "00:00",
          instructions: lang === "es"
            ? "Caminata ligera o estiramientos suaves para facilitar la recuperación."
            : "Light walk or gentle stretches to aid recovery."
        }
      ]
    },

    intermediate: {
      lunes: [
        {
          name: "Jumping jacks",
          video: "/assets/jumping-jacks.mov",
          workTime: "00:45",
          restTime: "00:20",
          instructions: lang === "es"
            ? "Separe piernas y brazos, saltando con ritmo constante. Mantenga el core firme todo el tiempo."
            : "Jump feet and arms outward at a steady pace. Keep your core engaged throughout."
        },
        {
          name: "Flexiones clásicas",
          video: "/assets/pushup.mov",
          workTime: "00:45",
          restTime: "00:20",
          instructions: lang === "es"
            ? "Manos a la altura de hombros, cuerpo recto. Baje codos hasta 90 ° y suba con control."
            : "Hands shoulder-width, body in a straight line. Lower elbows to 90° and push back up in control."
        },
        {
          name: "Sentadillas libres",
          video: "/assets/squat.mov",
          workTime: "00:45",
          restTime: "00:20",
          instructions: lang === "es"
            ? "Pies al ancho de hombros, baja caderas hasta que muslos queden paralelos al piso. Empuje con talones."
            : "Feet shoulder-width, lower hips until thighs are parallel to floor. Push through heels."
        }
      ],
      martes: [
        {
          name: "Flexiones inclinadas",
          video: "/assets/incline-pushup.mov",
          workTime: "00:45",
          restTime: "00:20",
          instructions: lang === "es"
            ? "Manos en superficie elevada, cuerpo en línea, baje hasta que pecho casi toque la superficie y suba."
            : "Hands on elevated surface, body in line, lower until chest nearly touches surface, then push back."
        },
        {
          name: "Press con mancuernas",
          video: "/assets/bench-press.mov",
          workTime: "00:50",
          restTime: "00:10",
          instructions: lang === "es"
            ? "En banco plano, empuje las mancuernas desde el pecho hasta extender brazos, baje controlado."
            : "On flat bench, push dumbbells from chest until arms are fully extended, lower under control."
        }
      ],
      miércoles: [
        {
          name: "Sentadillas profundas",
          video: "/assets/deep-squat.mov",
          workTime: "00:45",
          restTime: "00:20",
          instructions: lang === "es"
            ? "Baje caderas por debajo de las rodillas si puede, mantenga torso erguido y glúteos atrás."
            : "Squat until hips drop below knees if possible, keep torso upright and hips back."
        },
        {
          name: "Zancadas dinámicas",
          video: "/assets/lunge.mov",
          workTime: "00:35",
          restTime: "00:25",
          instructions: lang === "es"
            ? "Da paso amplio, baja rodilla trasera casi tocando el suelo y empuja con el talón para volver."
            : "Take a wide step, lower back knee near floor and push through heel to return."
        }
      ],
      jueves: [
        {
          name: "Dominadas asistidas",
          video: "/assets/assisted-pullup.mov",
          workTime: "00:35",
          restTime: "00:25",
          instructions: lang === "es"
            ? "Use banda o máquina asistida. Tira con la espalda y codos pegados al cuerpo, baja lento."
            : "Use band or assisted machine. Pull with your back and elbows close to torso, lower slowly."
        },
        {
          name: "Curl de bíceps pesado",
          video: "/assets/bicep-curl.mov",
          workTime: "00:45",
          restTime: "00:15",
          instructions: lang === "es"
            ? "Pies al ancho de hombros. Con mancuernas moderadas, flexiona codos y aprieta la contracción."
            : "Feet shoulder-width. With moderate dumbbells, curl elbows fully and squeeze at top."
        }
      ],
      viernes: [
        {
          name: "Burpees completos",
          video: "/assets/burpee.mov",
          workTime: "00:45",
          restTime: "00:15",
          instructions: lang === "es"
            ? "Desde pie, baja a plancha, push-up, vuelve a pie y salta explosivo con rodillas al pecho."
            : "From standing, drop to plank, push-up, return to standing and jump explosively knees to chest."
        },
        {
          name: "Sentadillas libres",
          video: "/assets/squat.mov",
          workTime: "00:45",
          restTime: "00:20",
          instructions: lang === "es"
            ? "Mantén ritmo constante, baja hasta paralelo y sube con explosión, empujando con talones."
            : "Keep a steady pace, squat to parallel and rise explosively, pushing through heels."
        },
        {
          name: "Flexiones clásicas",
          video: "/assets/pushup.mov",
          workTime: "00:45",
          restTime: "00:20",
          instructions: lang === "es"
            ? "Mantén cuerpo recto, baja hasta 90 ° en codos y sube con control sin que caderas caigan."
            : "Maintain a straight body, lower to 90° elbows and push up in control without hips sagging."
        }
      ],
      sábado: [
        {
          name: "Yoga intermedio",
          video: "/assets/yoga.mov",
          workTime: "25:00",
          restTime: "00:00",
          instructions: lang === "es"
            ? "Secuencia de posturas de flujo que aumentan flexibilidad y fuerza, manteniendo respiración controlada."
            : "Flow of intermediate poses to build flexibility and strength, keeping breath controlled."
        }
      ],
      domingo: [
        {
          name: "Descanso activo",
          video: "/assets/rest.mov",
          workTime: "25:00",
          restTime: "00:00",
          instructions: lang === "es"
            ? "Caminata moderada o estiramientos dinámicos para mejorar circulación y recuperación."
            : "Moderate walk or dynamic stretches to improve circulation and recovery."
        }
      ]
    },

    advanced: {
      lunes: [
        {
          name: "Jumping jacks explosivos",
          video: "/assets/jumping-jacks.mov",
          workTime: "00:60",
          restTime: "00:10",
          instructions: lang === "es"
            ? "Salta más alto, separa piernas y brazos con velocidad y aterriza suavemente para proteger rodillas."
            : "Jump higher, spread arms and legs quickly, land softly to protect knees."
        },
        {
          name: "Flexiones avanzadas",
          video: "/assets/pushup.mov",
          workTime: "00:60",
          restTime: "00:10",
          instructions: lang === "es"
            ? "Mantén cuerpo en línea recta, baja a fondo y sube rápido. Puedes añadir palmada al subir si deseas."
            : "Keep body straight, descend fully and push up explosively. You can clap hands on the way up."
        },
        {
          name: "Sentadillas con salto",
          video: "/assets/squat.mov",
          workTime: "00:60",
          restTime: "00:10",
          instructions: lang === "es"
            ? "Baja en sentadilla y salta con explosión, estirando completamente las caderas en la parte superior."
            : "Descend into squat and explode into a jump, fully extending hips at the top."
        }
      ],
      martes: [
        {
          name: "Flexiones con elevación de pies",
          video: "/assets/incline-pushup.mov",
          workTime: "00:60",
          restTime: "00:10",
          instructions: lang === "es"
            ? "Coloca pies en superficie elevada para aumentar la inclinación. Flexiona a fondo y sube rápido."
            : "Place feet on elevated surface to increase incline. Lower fully and push up quickly."
        },
        {
          name: "Press con mancuernas pesada",
          video: "/assets/bench-press.mov",
          workTime: "00:60",
          restTime: "00:10",
          instructions: lang === "es"
            ? "Elige un peso desafiante que te obligue a completar series de 8–10 repeticiones. Baja controlado y sube con explosión."
            : "Pick a challenging weight to complete 8–10 reps. Lower under control and press up explosively."
        }
      ],
      miércoles: [
        {
          name: "Sentadillas profundas con peso",
          video: "/assets/deep-squat.mov",
          workTime: "00:60",
          restTime: "00:10",
          instructions: lang === "es"
            ? "Con peso adicional (mancuerna o barra), desciende más allá de paralelo y sube empujando con fuerza."
            : "With added weight (dumbbell or bar), descend below parallel and push up powerfully."
        },
        {
          name: "Zancadas explosivas",
          video: "/assets/lunge.mov",
          workTime: "00:45",  
          restTime: "00:15",
          instructions: lang === "es"
            ? "Realiza zancadas alternas descendiendo rápido y subiendo con un pequeño salto para cambiar de pierna."
            : "Perform alternating lunges, lowering quickly and rising with a small jump to switch legs."
        }
      ],
      jueves: [
        {
          name: "Dominadas asistidas con peso",
          video: "/assets/assisted-pullup.mov",
          workTime: "00:45",
          restTime: "00:15",
          instructions: lang === "es"
            ? "Añade peso ligero a tu cinturón cuando uses banda. Sube explosivo y baja controlado."
            : "Add a light weight to your belt when using band. Pull up explosively and lower slowly."
        },
        {
          name: "Curl de bíceps concentrado",
          video: "/assets/bicep-curl.mov",
          workTime: "00:45",
          restTime: "00:15",
          instructions: lang === "es"
            ? "Apoya el brazo en tu muslo, realiza contracción máxima y baja controlado para trabajar pico del bíceps."
            : "Rest your arm on your thigh, perform maximal contraction, and lower slowly to peak the biceps."
        }
      ],
      viernes: [
        {
          name: "Burpees avanzados",
          video: "/assets/burpee.mov",
          workTime: "00:60",
          restTime: "00:10",
          instructions: lang === "es"
            ? "Agrega un salto a una pierna o flexión con palmada para aumentar dificultad. Mantén ritmo alto."
            : "Add a one-legged jump or clap push-up to increase difficulty. Keep a fast pace."
        },
        {
          name: "Sentadillas con salto pesado",
          video: "/assets/squat.mov",
          workTime: "00:60",
          restTime: "00:10",
          instructions: lang === "es"
            ? "Sujeta una pesa cerca del pecho y salta explosivo, recibiendo con una sentadilla para amortiguar."
            : "Hold a weight near your chest and jump explosively, landing in a squat to absorb impact."
        },
        {
          name: "Flexiones explosivas",
          video: "/assets/pushup.mov",
          workTime: "00:60",
          restTime: "00:10",
          instructions: lang === "es"
            ? "Sin tocar suelo en la fase descendente: baja y empuja con tanta fuerza que manos se separen brevemente."
            : "Without touching the floor on the descent: lower and push so hard that your hands briefly leave the ground."
        }
      ],
      sábado: [
        {
          name: "Yoga avanzado",
          video: "/assets/yoga.mov",
          workTime: "30:00",
          restTime: "00:00",
          instructions: lang === "es"
            ? "Flujo de posturas que incluye inversions suaves y equilibrios para aumentar fuerza y flexibilidad."
            : "Flow of poses including gentle inversions and balances to build strength and flexibility."
        }
      ],
      domingo: [
        {
          name: "Descanso activo completo",
          video: "/assets/rest.mov",
          workTime: "30:00",
          restTime: "00:00",
          instructions: lang === "es"
            ? "Combinación de caminata rápida y estiramientos dinámicos para una recuperación completa de alta calidad."
            : "Combination of brisk walk and dynamic stretches for a high-quality, full recovery."
        }
      ]
    }
  };

  // ╔══╗ Obtenemos los ejercicios del nivel seleccionado para el día de hoy
  const ejercicios = rutina[level][diaHoy] || [];

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {lang === "es" ? "Mi rutina de hoy" : "My routine today"} ({diaHoy})
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          {lang === "es" ? "Cerrar sesión" : "Logout"}
        </button>
      </div>

      {/* ════════════════════════════════════════ Selector de nivel ═══════════════════════════════════════ */}
      <div>
        <label className="mr-2 text-gray-700 dark:text-gray-200 font-semibold">
          {lang === "es" ? "Nivel:" : "Level:"}
        </label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring"
        >
          <option value="beginner">{lang === "es" ? "Principiante" : "Beginner"}</option>
          <option value="intermediate">{lang === "es" ? "Intermedio" : "Intermediate"}</option>
          <option value="advanced">{lang === "es" ? "Avanzado" : "Advanced"}</option>
        </select>
      </div>

      {/* ════════════════════════════════════════ Cuadrícula de ejercicios ═══════════════════════════════════════ */}
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
              {lang === "es" ? "Trabajo:" : "Work:"} {ej.workTime} {" | "}
              {lang === "es" ? "Descanso:" : "Rest:"} {ej.restTime}
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
