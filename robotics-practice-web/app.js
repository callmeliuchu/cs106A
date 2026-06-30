const chapters = [
  {
    id: "frames",
    title: "坐标系与刚体变换",
    focus: "把点、向量、旋转和平移放在明确的参考系里表达，避免把变换方向写反。",
    formula: "p_A = R_AB p_B\nG_AC = G_AB G_BC\nG_AB^{-1} = G_BA",
    qa: {
      title: "解释 R_AB 的含义",
      prompt: "用自己的话解释 R_AB 和 R_BA 的区别。给一个点 p_B，说明如何得到 p_A；再说明为什么 R_BA = R_AB^T。",
      rubric: "应说明 R_AB 的列向量是 B 坐标轴在 A 中的表达；p_A = R_AB p_B；旋转矩阵正交，所以逆等于转置。"
    },
    coding: {
      title: "实现 SE(3) 复合与求逆",
      prompt: "写 Python 函数 compose(G_ab, G_bc) 和 invert(G_ab)。G 是 4x4 齐次矩阵，返回 G_ac 和 G_ba。",
      starter: "import numpy as np\n\ndef compose(G_ab, G_bc):\n    # return G_ac\n    pass\n\ndef invert(G_ab):\n    # return G_ba\n    pass",
      reference: "compose 直接矩阵乘法。invert 需要取 R = G[:3,:3], p = G[:3,3]，返回 [[R.T, -R.T @ p], [0,0,0,1]]。"
    }
  },
  {
    id: "so3",
    title: "SO(3) 旋转",
    focus: "理解旋转矩阵、轴角表示、hat map、Rodrigues 公式和 Euler angles 的局限。",
    formula: "R^T R = I, det(R)=1\nR = exp(omega_hat theta)\nomega_hat x = omega x x",
    qa: {
      title: "判断一个矩阵是否是旋转",
      prompt: "给定一个 3x3 矩阵 R，你会用哪两个条件判断它是否属于 SO(3)？为什么 det(R) = -1 不可以表示正常刚体旋转？",
      rubric: "应包含 R^T R = I 和 det(R)=1；det=-1 表示包含反射，会改变右手系方向。"
    },
    coding: {
      title: "实现 hat 与 Rodrigues",
      prompt: "写函数 hat(omega) 和 rodrigues(omega, theta)。假设 omega 已经是单位向量。",
      starter: "import numpy as np\n\ndef hat(omega):\n    wx, wy, wz = omega\n    pass\n\ndef rodrigues(omega, theta):\n    W = hat(omega)\n    pass",
      reference: "hat 返回 [[0,-wz,wy],[wz,0,-wx],[-wy,wx,0]]；Rodrigues: I + sin(theta)W + (1-cos(theta))W@W。"
    }
  },
  {
    id: "se3",
    title: "SE(3)、Twist 与指数坐标",
    focus: "用一个 twist 描述刚体的瞬时 screw motion，再通过指数映射得到有限位姿变化。",
    formula: "xi = [v; omega]\nG = exp(xi_hat theta)\nrevolute: xi = [-omega x q; omega]\nprismatic: xi = [v; 0]",
    qa: {
      title: "区分三类关节 twist",
      prompt: "分别说明 revolute、prismatic、screw joint 的 twist 形式。为什么 revolute joint 里会出现 -omega x q？",
      rubric: "应写出三类 twist；说明 q 是轴上一点，-omega x q 让该轴上的点瞬时速度为 0。"
    },
    coding: {
      title: "从 revolute joint 构造 twist",
      prompt: "写函数 revolute_twist(omega, q)，返回 6 维 twist [v, omega]。omega 是单位旋转轴，q 是轴上一点。",
      starter: "import numpy as np\n\ndef revolute_twist(omega, q):\n    # return np.r_[v, omega]\n    pass",
      reference: "v = -np.cross(omega, q)，然后 np.concatenate([v, omega])。"
    }
  },
  {
    id: "fk",
    title: "正运动学 Forward Kinematics",
    focus: "输入关节变量 theta，输出末端位姿 G_ST(theta)。",
    formula: "G_ST(theta) = exp(xi1_hat theta1) ... exp(xin_hat thetan) G_ST(0)",
    qa: {
      title: "POE 建模步骤",
      prompt: "看到一个机械臂图后，按顺序说明如何用 Product of Exponentials 写出它的正运动学。",
      rubric: "应包含选空间/工具坐标系、写 G(0)、为每个关节找轴 omega 或 v、选 q、写 twist、按关节顺序连乘。"
    },
    coding: {
      title: "2R 平面机械臂 FK",
      prompt: "写函数 fk_2r(theta1, theta2, L1, L2)，返回末端位置 (x,y)。两个关节都绕 z 轴转。",
      starter: "import math\n\ndef fk_2r(theta1, theta2, L1, L2):\n    x = None\n    y = None\n    return x, y",
      reference: "x = L1*cos(t1) + L2*cos(t1+t2)，y = L1*sin(t1) + L2*sin(t1+t2)。"
    }
  },
  {
    id: "ik",
    title: "逆运动学 Inverse Kinematics",
    focus: "输入目标末端位姿或位置，求可能的关节变量，并判断多解、无解和 workspace。",
    formula: "target pose -> theta\nworkspace: reachable set\nIK often has 0, 1, or many solutions",
    qa: {
      title: "为什么 IK 会多解",
      prompt: "用 2R 平面机械臂解释为什么同一个末端点可能对应 elbow-up 和 elbow-down 两组解。什么情况下无解？",
      rubric: "应提到几何圆交点、肘上/肘下两种构型；目标距离大于 L1+L2 或小于 |L1-L2| 时无解。"
    },
    coding: {
      title: "2R 平面机械臂 IK",
      prompt: "写函数 ik_2r(x, y, L1, L2)，返回两组可能的 (theta1, theta2)。可以忽略数值边界细节，但要体现 cosine law。",
      starter: "import math\n\ndef ik_2r(x, y, L1, L2):\n    # return [(t1a, t2a), (t1b, t2b)] or []\n    pass",
      reference: "c2=(x^2+y^2-L1^2-L2^2)/(2L1L2)。若 |c2|>1 无解。t2=+-acos(c2)。t1=atan2(y,x)-atan2(L2*sin(t2), L1+L2*cos(t2))。"
    }
  },
  {
    id: "velocities",
    title: "速度、Body/Spatial Twist 与 Adjoint",
    focus: "把位姿轨迹 g(t) 的变化率表达成 body 或 spatial 速度，并能在坐标系间变换 twist。",
    formula: "V_s_hat = g_dot g^{-1}\nV_b_hat = g^{-1} g_dot\nV_s = Ad_g V_b",
    qa: {
      title: "区分 spatial velocity 和 body velocity",
      prompt: "说明 V_s 和 V_b 分别在哪个坐标系表达。为什么同一个刚体运动会有两个不同的速度表示？",
      rubric: "应说明 spatial 在固定空间系表达，body 在运动体系表达；物理运动相同但坐标表达不同，可用 Ad_g 转换。"
    },
    coding: {
      title: "实现 Adjoint 矩阵",
      prompt: "写函数 adjoint(G)，输入 4x4 齐次矩阵，输出 6x6 Ad_G。采用 twist 顺序 [v; omega]。",
      starter: "import numpy as np\n\ndef skew(p):\n    px, py, pz = p\n    return np.array([[0, -pz, py], [pz, 0, -px], [-py, px, 0]])\n\ndef adjoint(G):\n    R = G[:3, :3]\n    p = G[:3, 3]\n    # for [v; omega]\n    pass",
      reference: "若 twist 顺序为 [v; omega]，Ad_G = [[R, skew(p)@R], [0, R]]。若顺序换成 [omega; v]，块结构会不同。"
    }
  },
  {
    id: "jacobian",
    title: "Jacobian 与奇异性",
    focus: "Jacobian 把关节速度映射到末端 twist；rank 下降意味着某些末端速度方向不可达。",
    formula: "V = J(theta) theta_dot\nsingular if rank(J) drops\nmu(theta) = product sigma_i",
    qa: {
      title: "奇异性的物理意义",
      prompt: "解释 Jacobian rank deficiency 为什么意味着机械臂处在奇异构型。奇异值和 manipulability 如何帮助判断离奇异点多近？",
      rubric: "应说明 rank 下降导致速度空间维度减少；至少一个奇异值接近 0 时 manipulability 变小。"
    },
    coding: {
      title: "2R 平面机械臂 Jacobian",
      prompt: "写函数 jacobian_2r(theta1, theta2, L1, L2)，返回末端位置速度对两个关节速度的 2x2 Jacobian。",
      starter: "import math\nimport numpy as np\n\ndef jacobian_2r(theta1, theta2, L1, L2):\n    # return np.array([[...], [...]])\n    pass",
      reference: "第一行是 dx/dtheta，第二行是 dy/dtheta。J[0,0] = -L1 sin t1 - L2 sin(t1+t2)，J[0,1] = -L2 sin(t1+t2)；y 行为对应 cos。"
    }
  },
  {
    id: "vision",
    title: "计算机视觉几何",
    focus: "用针孔相机模型把 3D 点投影到图像，并理解 depth、triangulation 和 essential matrix 的尺度歧义。",
    formula: "lambda x = K X\nE = T_hat R\nx_2^T E x_1 = 0",
    qa: {
      title: "解释 depth 和尺度歧义",
      prompt: "为什么只知道一个图像点 x 和相机矩阵 K 时，不能唯一恢复 3D 点 X？两视图为什么仍然会有 translation scale ambiguity？",
      rubric: "应说明单目投影丢失深度，只能得到一条 ray；essential matrix 对平移只恢复方向，尺度需要额外信息。"
    },
    coding: {
      title: "实现针孔相机投影",
      prompt: "写函数 project_point(K, X)，输入 3x3 K 和相机坐标系中的 3D 点 X=[X,Y,Z]，返回像素齐次归一化后的 (u,v)。",
      starter: "import numpy as np\n\ndef project_point(K, X):\n    # x_h = K @ X, then divide by depth-like third component\n    pass",
      reference: "x = K @ X；返回 x[:2] / x[2]。需要处理 Z 或 x[2] 接近 0 的情况。"
    }
  },
  {
    id: "dynamics",
    title: "Lagrangian 动力学",
    focus: "从能量出发推导系统动力学，并整理成 M(q) q_ddot + C(q,q_dot) q_dot + N(q) = Upsilon。",
    formula: "L = T - V\nd/dt(dL/dq_dot) - dL/dq = Upsilon\nM q_ddot + C q_dot + N = Upsilon",
    qa: {
      title: "Lagrangian 推导流程",
      prompt: "按步骤说明如何从一个机械系统图推导动力学。为什么 generalized coordinates 的选择很关键？",
      rubric: "应包含选 q、写质心位置、求速度、写 T/V、套 Euler-Lagrange、整理 M/C/N；q 决定自由度和约束处理方式。"
    },
    coding: {
      title: "斜面弹簧质量块动力学",
      prompt: "写函数 incline_mass_spring_ddot(x, xdot, m, k, g, alpha, u)，令 x 沿斜面向下为正，返回 x_ddot。",
      starter: "import math\n\ndef incline_mass_spring_ddot(x, xdot, m, k, g, alpha, u=0.0):\n    # m*xddot = ?\n    pass",
      reference: "一种符号约定下：m xddot = m g sin(alpha) - k x + u。若阻尼未给出，不应凭空加入。"
    }
  },
  {
    id: "control",
    title: "线性化、稳定性与控制",
    focus: "围绕平衡点线性化非线性系统，用特征值判断稳定性，用可控性和反馈设计控制律。",
    formula: "x_dot = f(x,u)\nA = df/dx, B = df/du\ncontrollable if rank([B AB ... A^{n-1}B]) = n",
    qa: {
      title: "从模型到控制器",
      prompt: "说明如何从非线性动力学得到线性化模型，并用它判断稳定性和可控性。PD 控制里的 Kp、Kd 分别在做什么？",
      rubric: "应说明在平衡点取 Jacobian 得到 A/B；特征值实部判断局部稳定；controllability matrix 满秩；Kp 管位置误差，Kd 管速度误差/阻尼。"
    },
    coding: {
      title: "二阶系统 PD 控制",
      prompt: "写函数 pd_accel(q, qdot, q_des, qdot_des, qddot_des, kp, kd)，返回期望加速度，使误差满足 e_ddot + kd e_dot + kp e = 0。",
      starter: "def pd_accel(q, qdot, q_des, qdot_des, qddot_des, kp, kd):\n    # e = q_des - q\n    pass",
      reference: "e=q_des-q, edot=qdot_des-qdot；qddot_cmd = qddot_des + kd*edot + kp*e。符号要和误差定义一致。"
    }
  }
];

const storageKey = "robotics-practice-submissions-v1";
const currentKey = "robotics-practice-current-chapter";
const exerciseKey = "robotics-practice-current-exercise";
let currentChapterIndex = Number(localStorage.getItem(currentKey) || 0);
let currentExerciseIndex = Number(localStorage.getItem(exerciseKey) || 0);
let selectedSubmissionId = null;

const el = {
  chapterNav: document.getElementById("chapterNav"),
  studentModeBtn: document.getElementById("studentModeBtn"),
  teacherModeBtn: document.getElementById("teacherModeBtn"),
  studentView: document.getElementById("studentView"),
  teacherView: document.getElementById("teacherView"),
  chapterIndex: document.getElementById("chapterIndex"),
  chapterTitle: document.getElementById("chapterTitle"),
  chapterFocus: document.getElementById("chapterFocus"),
  chapterFormula: document.getElementById("chapterFormula"),
  exerciseCount: document.getElementById("exerciseCount"),
  exercisePicker: document.getElementById("exercisePicker"),
  qaTitle: document.getElementById("qaTitle"),
  qaPrompt: document.getElementById("qaPrompt"),
  qaAnswer: document.getElementById("qaAnswer"),
  codingTitle: document.getElementById("codingTitle"),
  codingPrompt: document.getElementById("codingPrompt"),
  starterCode: document.getElementById("starterCode"),
  codeAnswer: document.getElementById("codeAnswer"),
  studentName: document.getElementById("studentName"),
  studentNote: document.getElementById("studentNote"),
  answerForm: document.getElementById("answerForm"),
  submissionList: document.getElementById("submissionList"),
  submissionCount: document.getElementById("submissionCount"),
  reviewPanel: document.getElementById("reviewPanel"),
  exportBtn: document.getElementById("exportBtn"),
  exportStudentBtn: document.getElementById("exportStudentBtn"),
  importBtn: document.getElementById("importBtn"),
  importFile: document.getElementById("importFile"),
  clearBtn: document.getElementById("clearBtn"),
  aiHintBtn: document.getElementById("aiHintBtn"),
  toast: document.getElementById("toast"),
  robotCanvas: document.getElementById("robotCanvas")
};

function getSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function saveSubmissions(items) {
  localStorage.setItem(storageKey, JSON.stringify(items));
}

function getExercises(chapter) {
  const base = {
    label: "基础",
    qa: chapter.qa,
    coding: chapter.coding
  };
  const extras = window.extraExercisesByChapter?.[chapter.id] || [];
  return [base, ...extras];
}

function getCurrentExercise() {
  const chapter = chapters[currentChapterIndex];
  const exercises = getExercises(chapter);
  if (currentExerciseIndex >= exercises.length) currentExerciseIndex = 0;
  return exercises[currentExerciseIndex];
}

function getSubmissionExercise(item, chapter) {
  const exercises = getExercises(chapter);
  if (Number.isInteger(item.exerciseIndex) && exercises[item.exerciseIndex]) {
    return exercises[item.exerciseIndex];
  }
  return {
    label: item.exerciseLabel || "基础",
    qa: {
      title: item.qaTitle || chapter.qa.title,
      prompt: item.qaPrompt || chapter.qa.prompt,
      rubric: chapter.qa.rubric
    },
    coding: {
      title: item.codingTitle || chapter.coding.title,
      prompt: item.codingPrompt || chapter.coding.prompt,
      starter: chapter.coding.starter,
      reference: chapter.coding.reference
    }
  };
}

function toast(message) {
  el.toast.textContent = message;
  el.toast.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => el.toast.classList.remove("show"), 3200);
}

function renderNav() {
  el.chapterNav.innerHTML = "";
  chapters.forEach((chapter, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === currentChapterIndex ? "active" : "";
    button.innerHTML = `<span>${index + 1}</span><span>${chapter.title}</span>`;
    button.addEventListener("click", () => {
      currentChapterIndex = index;
      localStorage.setItem(currentKey, String(index));
      renderStudent();
      renderNav();
    });
    el.chapterNav.appendChild(button);
  });
}

function renderStudent() {
  const chapter = chapters[currentChapterIndex];
  const exercise = getCurrentExercise();
  el.chapterIndex.textContent = `第 ${currentChapterIndex + 1} 章 / ${chapters.length}`;
  el.chapterTitle.textContent = chapter.title;
  el.chapterFocus.textContent = chapter.focus;
  el.chapterFormula.textContent = chapter.formula;
  renderExercisePicker(chapter);
  el.qaTitle.textContent = exercise.qa.title;
  el.qaPrompt.textContent = exercise.qa.prompt;
  el.codingTitle.textContent = exercise.coding.title;
  el.codingPrompt.textContent = exercise.coding.prompt;
  el.starterCode.textContent = exercise.coding.starter;
  el.qaAnswer.value = "";
  el.codeAnswer.value = exercise.coding.starter;
  drawRobot(currentChapterIndex);
}

function renderExercisePicker(chapter) {
  const exercises = getExercises(chapter);
  el.exerciseCount.textContent = `${exercises.length} 组 / ${exercises.length * 2} 题`;
  el.exercisePicker.innerHTML = "";
  exercises.forEach((exercise, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === currentExerciseIndex ? "active" : "";
    button.innerHTML = `题组 ${index + 1}<small>${escapeHtml(exercise.label)}</small>`;
    button.addEventListener("click", () => {
      currentExerciseIndex = index;
      localStorage.setItem(exerciseKey, String(index));
      renderStudent();
    });
    el.exercisePicker.appendChild(button);
  });
}

function drawRobot(index) {
  const canvas = el.robotCanvas;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "#f7faf7";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#d0ddd2";
  ctx.lineWidth = 1;
  for (let x = 20; x < w; x += 28) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 18; y < h; y += 28) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  const base = { x: 58, y: 136 };
  const a1 = -0.68 + index * 0.08;
  const a2 = 0.92 - index * 0.05;
  const p1 = { x: base.x + 84 * Math.cos(a1), y: base.y + 84 * Math.sin(a1) };
  const p2 = { x: p1.x + 66 * Math.cos(a1 + a2), y: p1.y + 66 * Math.sin(a1 + a2) };

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#1d6f5f";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(base.x, base.y);
  ctx.lineTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();

  ctx.strokeStyle = "#b84a34";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(p2.x, p2.y);
  ctx.lineTo(p2.x + 26, p2.y - 6);
  ctx.stroke();

  [base, p1, p2].forEach((p, i) => {
    ctx.beginPath();
    ctx.fillStyle = i === 2 ? "#b84a34" : "#17211b";
    ctx.arc(p.x, p.y, i === 2 ? 8 : 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "700 11px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(i === 2 ? "T" : String(i + 1), p.x, p.y);
  });

  ctx.fillStyle = "#315f9d";
  ctx.font = "700 12px system-ui";
  ctx.fillText("G_ST(theta)", 202, 34);
}

function setMode(mode) {
  const teacher = mode === "teacher";
  el.studentView.classList.toggle("active-view", !teacher);
  el.teacherView.classList.toggle("active-view", teacher);
  el.studentModeBtn.classList.toggle("active", !teacher);
  el.teacherModeBtn.classList.toggle("active", teacher);
  if (teacher) renderTeacher();
}

function handleSubmit(event) {
  event.preventDefault();
  const chapter = chapters[currentChapterIndex];
  const exercise = getCurrentExercise();
  const submission = {
    id: crypto.randomUUID(),
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    exerciseIndex: currentExerciseIndex,
    exerciseLabel: exercise.label,
    qaTitle: exercise.qa.title,
    qaPrompt: exercise.qa.prompt,
    codingTitle: exercise.coding.title,
    codingPrompt: exercise.coding.prompt,
    studentName: el.studentName.value.trim(),
    note: el.studentNote.value.trim(),
    qaAnswer: el.qaAnswer.value.trim(),
    codeAnswer: el.codeAnswer.value.trim(),
    createdAt: new Date().toISOString(),
    grade: "",
    feedback: "",
    aiReview: ""
  };

  const items = getSubmissions();
  items.unshift(submission);
  saveSubmissions(items);
  toast("已提交。本地教师端可以看到这份答案。");
  el.qaAnswer.value = "";
  el.studentNote.value = "";
}

function renderTeacher() {
  const items = getSubmissions();
  el.submissionCount.textContent = String(items.length);
  el.submissionList.innerHTML = "";

  if (!items.length) {
    el.submissionList.innerHTML = `<div class="empty-state"><p>还没有提交。</p></div>`;
    return;
  }

  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `submission-item ${item.id === selectedSubmissionId ? "active" : ""}`;
    const date = new Date(item.createdAt).toLocaleString();
    const label = item.exerciseLabel ? ` · ${escapeHtml(item.exerciseLabel)}` : "";
    button.innerHTML = `${escapeHtml(item.studentName)}<small>${escapeHtml(item.chapterTitle)}${label} · ${date}</small>`;
    button.addEventListener("click", () => {
      selectedSubmissionId = item.id;
      renderTeacher();
      renderReview(item.id);
    });
    el.submissionList.appendChild(button);
  });
}

function renderReview(id) {
  const item = getSubmissions().find((entry) => entry.id === id);
  if (!item) return;
  const chapter = chapters.find((entry) => entry.id === item.chapterId);
  const exercise = getSubmissionExercise(item, chapter);
  el.reviewPanel.innerHTML = `
    <h3>${escapeHtml(item.chapterTitle)}</h3>
    <p class="prompt">题组：${escapeHtml(exercise.label)} · 学生：${escapeHtml(item.studentName)}${item.note ? " · 备注：" + escapeHtml(item.note) : ""}</p>
    <div class="review-grid">
      <div class="answer-box">
        <strong>问答题答案：${escapeHtml(exercise.qa.title)}</strong>
        <p class="prompt">${escapeHtml(exercise.qa.prompt)}</p>
        <pre>${escapeHtml(item.qaAnswer)}</pre>
      </div>
      <div class="rubric-box">
        <strong>问答参考要点</strong>
        <pre>${escapeHtml(exercise.qa.rubric)}</pre>
      </div>
      <div class="answer-box">
        <strong>编程题答案：${escapeHtml(exercise.coding.title)}</strong>
        <p class="prompt">${escapeHtml(exercise.coding.prompt)}</p>
        <pre>${escapeHtml(item.codeAnswer)}</pre>
      </div>
      <div class="rubric-box">
        <strong>编程参考要点</strong>
        <pre>${escapeHtml(exercise.coding.reference)}</pre>
      </div>
    </div>
    ${item.aiReview ? `<div class="ai-box"><strong>AI 辅助批改</strong><pre>${escapeHtml(item.aiReview)}</pre></div>` : ""}
    <div class="grade-row">
      <div>
        <label for="gradeInput">分数</label>
        <input id="gradeInput" type="text" value="${escapeAttr(item.grade)}" placeholder="例如：8/10">
      </div>
      <div>
        <label for="feedbackInput">教师评语</label>
        <input id="feedbackInput" type="text" value="${escapeAttr(item.feedback)}" placeholder="写下反馈">
      </div>
      <button id="saveGradeBtn" type="button">保存批改</button>
    </div>
    <div class="header-actions" style="margin-top:14px; justify-content:flex-start">
      <button id="aiReviewBtn" class="secondary" type="button">AI 辅助批改</button>
      <button id="deleteSubmissionBtn" class="danger" type="button">删除提交</button>
    </div>
  `;

  document.getElementById("saveGradeBtn").addEventListener("click", () => saveGrade(item.id));
  document.getElementById("deleteSubmissionBtn").addEventListener("click", () => deleteSubmission(item.id));
  document.getElementById("aiReviewBtn").addEventListener("click", () => aiReview(item.id));
}

function saveGrade(id) {
  const items = getSubmissions();
  const item = items.find((entry) => entry.id === id);
  if (!item) return;
  item.grade = document.getElementById("gradeInput").value.trim();
  item.feedback = document.getElementById("feedbackInput").value.trim();
  saveSubmissions(items);
  toast("批改已保存。");
  renderTeacher();
}

function deleteSubmission(id) {
  if (!window.confirm("确定删除这份提交吗？")) return;
  saveSubmissions(getSubmissions().filter((entry) => entry.id !== id));
  selectedSubmissionId = null;
  renderTeacher();
  el.reviewPanel.innerHTML = `<div class="empty-state"><h3>选择一个提交开始批改</h3><p>每个提交会显示题目、学生答案、参考要点和评分区。</p></div>`;
}

async function aiReview(id) {
  const items = getSubmissions();
  const item = items.find((entry) => entry.id === id);
  const chapter = chapters.find((entry) => entry.id === item?.chapterId);
  if (!item || !chapter) return;
  const exercise = getSubmissionExercise(item, chapter);
  const reviewChapter = { ...chapter, qa: exercise.qa, coding: exercise.coding };

  const button = document.getElementById("aiReviewBtn");
  button.disabled = true;
  button.textContent = "批改中";
  try {
    const response = await fetch("/api/ai-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submission: item, chapter: reviewChapter })
    });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(detail || `HTTP ${response.status}`);
    }
    const data = await response.json();
    item.aiReview = data.review;
    saveSubmissions(items);
    renderReview(id);
    toast("AI 辅助批改已生成。");
  } catch (error) {
    toast(`AI 批改不可用：${error.message}`);
  } finally {
    button.disabled = false;
  }
}

async function aiHint() {
  const chapter = chapters[currentChapterIndex];
  const exercise = getCurrentExercise();
  const hintChapter = { ...chapter, qa: exercise.qa, coding: exercise.coding };
  try {
    const response = await fetch("/api/ai-hint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapter: hintChapter })
    });
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    toast(data.hint);
  } catch (error) {
    toast("AI 提示需要通过本地 server.mjs 启动，并配置 OpenAI-compatible API。");
  }
}

function exportJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function importJson(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!Array.isArray(parsed)) throw new Error("JSON 顶层必须是数组");
      saveSubmissions(parsed);
      selectedSubmissionId = null;
      renderTeacher();
      toast("导入完成。");
    } catch (error) {
      toast(`导入失败：${error.message}`);
    }
  };
  reader.readAsText(file);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}

el.studentModeBtn.addEventListener("click", () => setMode("student"));
el.teacherModeBtn.addEventListener("click", () => setMode("teacher"));
el.answerForm.addEventListener("submit", handleSubmit);
el.exportBtn.addEventListener("click", () => exportJson("robotics-practice-graded.json", getSubmissions()));
el.exportStudentBtn.addEventListener("click", () => exportJson("robotics-practice-my-submissions.json", getSubmissions()));
el.importBtn.addEventListener("click", () => el.importFile.click());
el.importFile.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (file) importJson(file);
  event.target.value = "";
});
el.clearBtn.addEventListener("click", () => {
  if (!window.confirm("确定清空所有本地提交和批改结果吗？")) return;
  saveSubmissions([]);
  selectedSubmissionId = null;
  renderTeacher();
  toast("本地数据已清空。");
});
el.aiHintBtn.addEventListener("click", aiHint);

renderNav();
renderStudent();
