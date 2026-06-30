const noCode = {
  title: "本题无代码提交",
  prompt: "这是 PDF 书面题。代码区可留空，也可以写推导草稿、检查脚本或需要老师看的计算过程。",
  starter: "",
  reference: "按 PDF 原题要求批改书面推导、图示和结论。"
};

function written(title, prompt, rubric = "按 PDF 原题所有小问检查：符号、坐标系、推导步骤、最终表达式和解释是否完整。") {
  return { title, prompt, rubric };
}

function code(title, prompt, starter, reference) {
  return { title, prompt, starter, reference };
}

window.homeworkChapters = [
  {
    id: "hw0",
    title: "HW0 Linear Algebra Review",
    focus: "作业原题：线性代数复习、换基、矩阵指数和线性 ODE。",
    formula: "资料：hw0_linalg.pdf\n提交：PDF 书面答案",
    materials: [{ label: "PDF", href: "/materials/hw0_linalg.pdf" }],
    qa: written("Problem 0: It's Dangerous to Go Alone", "完成 HW0 PDF 中 Problem 0：找 study buddy，记录姓名和邮箱；可选提交合照。"),
    coding: noCode
  },
  {
    id: "hw1",
    title: "HW1 Rotations and Reference Frames",
    focus: "作业原题：旋转矩阵、Euler angles、卫星姿态恢复、软体机器人切向坐标系和 car visualization 代码。",
    formula: "资料：hw1_rotations.pdf, hw1_starter.zip\n提交：PDF + hw1.py",
    materials: [
      { label: "PDF", href: "/materials/hw1_rotations.pdf" },
      { label: "Starter ZIP", href: "/materials/hw1_starter.zip" }
    ],
    qa: written("Problem 1: Properties of Rotations", "完成 HW1 PDF 中 Problem 1：判断给定 2x2 transformation matrix 是否为有效 rotation，并逐项说明理由。"),
    coding: noCode
  },
  {
    id: "hw2",
    title: "HW2 Exponential Coordinates",
    focus: "作业原题：SE(3)、twist、exponential coordinates，以及 kin_func_skeleton.py / hw2.py 编程。",
    formula: "资料：hw2_exp.pdf, hw2_starter.zip\n提交：PDF + kin_func_skeleton.py + hw2.py",
    materials: [
      { label: "PDF", href: "/materials/hw2_exp.pdf" },
      { label: "Starter ZIP", href: "/materials/hw2_starter.zip" }
    ],
    qa: written("Problem 1: Running VelociROACH", "完成 HW2 PDF 中 Problem 1：计算 VelociROACH 场景中的 T02、T01、T21、尾部点坐标、screw axis、theta 和 exponential coordinates。"),
    coding: noCode
  },
  {
    id: "hw3",
    title: "HW3 Forward Kinematics",
    focus: "作业原题：3DOF、screw joint、Stanford arm 正运动学，以及 Frenet-Serret frame。",
    formula: "资料：hw3_fk.pdf\n提交：Problem 4 PDF + hw3.py + HW2 kin_func_skeleton.py",
    materials: [{ label: "PDF", href: "/materials/hw3_fk.pdf" }],
    qa: written("Problem 1: Forward Kinematics for 3 DOF Manipulators", "完成 HW3 PDF 中 Problem 1：求 3DOF manipulator 的 G_ST(0)、三个 joint twists 和 POE 正运动学表达。"),
    coding: code(
      "Problems 1-3 Code: hw3.py",
      "根据 HW3 PDF 要求，把 Problems 1-3 的正运动学结果实现到 hw3.py；同时使用 HW2 的 kin_func_skeleton.py。",
      "# Submit hw3.py and your HW2 kin_func_skeleton.py\n# Implement the FK maps requested by HW3 Problems 1-3.\n",
      "批改重点：G(0)、各 joint twist、POE 连乘顺序、prismatic/revolute/screw joint 处理是否与 PDF 图一致。"
    )
  },
  {
    id: "hw4",
    title: "HW4 Inverse Kinematics",
    focus: "作业原题：用 Paden-Kahan subproblems 分解 3DOF 和 Stanford arm 的 IK。",
    formula: "资料：hw4_ik.pdf\n提交：PDF 书面答案",
    materials: [{ label: "PDF", href: "/materials/hw4_ik.pdf" }],
    qa: written("Problem 1: Inverse Kinematics for 3DOF Manipulators", "完成 HW4 PDF 中 Problem 1：描述 reachable workspace，用 Paden-Kahan subproblems 分解 IK，并说明最大解数。"),
    coding: noCode
  },
  {
    id: "hw5",
    title: "HW5 Computer Vision",
    focus: "作业原题：two-view triangulation、essential matrix、planar motion models 和 geometry_learning.ipynb。",
    formula: "资料：hw5_vision.pdf, hw5_vision_theory.pdf, hw5_starter.zip\n提交：PDF，包括 notebook 结果截图",
    materials: [
      { label: "PDF", href: "/materials/hw5_vision.pdf" },
      { label: "Theory PDF", href: "/materials/hw5_vision_theory.pdf" },
      { label: "Starter ZIP", href: "/materials/hw5_starter.zip" }
    ],
    qa: written("Problem 1: Two-View Triangulation", "完成 HW5 PDF 中 Problem 1：写出 image coordinate、3D point、depth、R、T 之间的关系，并说明如何在有噪声时求 X1。"),
    coding: noCode
  },
  {
    id: "hw6",
    title: "HW6 Velocities and Adjoints",
    focus: "作业原题：spatial/body velocity twists、twist 作为速度、速度作为 twist、Adjoint 性质。",
    formula: "资料：hw6_velocities.pdf\n提交：PDF 书面答案",
    materials: [{ label: "PDF", href: "/materials/hw6_velocities.pdf" }],
    qa: written("Problem 1: Velocities Practice", "完成 HW6 PDF 中 Problem 1：根据图示求 fixed frame S 和 moving frame B 的 spatial/body velocity twists。"),
    coding: noCode
  },
  {
    id: "hw7",
    title: "HW7 Jacobians",
    focus: "作业原题：4DOF manipulator Jacobian、Euler angle singularities、coplanar axes singularity、manipulability。",
    formula: "资料：hw7_jacobians.pdf\n提交：PDF 书面答案",
    materials: [{ label: "PDF", href: "/materials/hw7_jacobians.pdf" }],
    qa: written("Problem 1: Jacobian for a 4DOF manipulator", "完成 HW7 PDF 中 Problem 1：计算图示 4DOF manipulator 在两个构型下的 spatial/body Jacobian，判断 singularity，并求给定 joint velocity 下的末端原点速度。"),
    coding: noCode
  },
  {
    id: "hw8",
    title: "HW8 Dynamics",
    focus: "作业原题：Lagrangian dynamics、rotational inertia、spacecraft dynamics 和 double pendulum SymPy 代码。",
    formula: "资料：hw8_dynamics.pdf, hw8_starter.zip\n提交：PDF + hw8.py",
    materials: [
      { label: "PDF", href: "/materials/hw8_dynamics.pdf" },
      { label: "Starter ZIP", href: "/materials/hw8_starter.zip" }
    ],
    qa: written("Problem 1: Dynamics of a Mass-Spring System", "完成 HW8 PDF 中 Problem 1：选择 generalized coordinate，用 Lagrangian dynamics 推导斜面弹簧质量系统 EOM，并写出 inertia、Coriolis、gravity/generalized force 含义。"),
    coding: noCode
  },
  {
    id: "hw9",
    title: "HW9 Control",
    focus: "作业原题：Lagrangian modeling、轨道系统线性化、稳定性、可控性和 rocket PD 控制。",
    formula: "资料：hw9_control.pdf\n提交：PDF 书面答案",
    materials: [{ label: "PDF", href: "/materials/hw9_control.pdf" }],
    qa: written("Problem 1: Cat and mouse", "完成 HW9 PDF 中 Problem 1：分别把 dangling mouse 建模为 point mass 和 homogeneous box，写出玩具系统的 Lagrangian。"),
    coding: noCode
  }
];

window.extraExercisesByChapter = {
  hw0: [
    { label: "P1 Orthogonal Matrices", qa: written("Problem 1: Orthogonal Matrices", "完成 HW0 PDF Problem 1：证明 orthogonal matrix 与 A^T A=I 的等价关系、norm preserving，以及 det(R)=+-1。"), coding: noCode },
    { label: "P2 Change of Coordinates", qa: written("Problem 2: A Change of Coordinates", "完成 HW0 PDF Problem 2：计算不同 basis 下的坐标，使用 G_ab 类 change-of-basis matrix，并回答两个 True/False 证明或反例题。"), coding: noCode },
    { label: "P3 Matrix Exponential", qa: written("Problem 3: Algebraic Properties of the Matrix Exponential", "完成 HW0 PDF Problem 3：用矩阵指数级数证明 e^0、transpose、similarity transform、eigenvalue、det(e^A)=e^{tr A} 等性质。"), coding: noCode },
    { label: "P4 Enter the Matrix", qa: written("Problem 4: Enter the Matrix", "完成 HW0 PDF Problem 4：求 scalar ODE、证明 d/dt e^{At}=Ae^{At}=e^{At}A、求 dx/dt=Ax 的解，并完成 bonus 系统解题。"), coding: noCode },
    { label: "P5 Python Review", qa: written("Problem 5: Optional Python Review", "完成 HW0 PDF Problem 5：按需完成 Python Bootcamp 复习；本题无需提交。", "确认是否需要 Python 复习，并记录已完成或跳过理由。"), coding: noCode }
  ],
  hw1: [
    { label: "P2 Euler Angles", qa: written("Problem 2: Euler Angles", "完成 HW1 PDF Problem 2：画 A/B 坐标系，写 R_AB、R_BA，并完成两个点坐标转换。"), coding: noCode },
    { label: "P3 Multiple Euler Angles", qa: written("Problem 3: Multiple Euler Angles", "完成 HW1 PDF Problem 3：分别处理绕 mobile axes 的 intrinsic rotation 和绕 original axes 的 extrinsic rotation，画图并写 net rotation matrix。"), coding: noCode },
    { label: "P4 Save the Satellite", qa: written("Problem 4: Save the Satellite!", "完成 HW1 PDF Problem 4：用距离传感器和 least squares 求卫星位置，用 Gram-Schmidt 构造 body frame，并写 R_ab。"), coding: noCode },
    { label: "P5 Squishy Rotations", qa: written("Problem 5: Squishy Rotations", "完成 HW1 PDF Problem 5：对软体机器人曲线 p(x) 求 unit tangent，构造沿曲线的 frame B 和 R_AB，并代入 f(x)=3x^3+4x 在 x=1 的结果。"), coding: noCode },
    {
      label: "P6 Code hw1.py",
      qa: written("Problem 6: Rotation Matrices in Action", "完成 HW1 PDF Problem 6：理解 car visualization 中需要把车角点按 theta 旋转到 world frame。"),
      coding: code("Code: hw1.py get_corners", "在 hw1_starter.zip 的 hw1.py 中实现 get_corners(xy, theta, corner1, corner2, corner3, corner4)，运行 car_vis.py 检查可视化。", "def get_corners(xy, theta, corner1, corner2, corner3, corner4):\n    # rotate each local corner by theta and translate by xy\n    pass", "批改重点：使用 2D rotation matrix；四个角点都先旋转再平移；返回格式与 starter code 兼容。")
    }
  ],
  hw2: [
    { label: "P2 Rotation Exp Coords", qa: written("Problem 2: Exponential Coordinates for Rotations", "完成 HW2 PDF Problem 2：证明 omega_hat theta 的 eigenvalues、R 的 eigenvalues、real eigenvalue 情况和几何解释，并证明两个 omega_hat identity。"), coding: noCode },
    {
      label: "P3 Code kin_func",
      qa: written("Problem 3: Implementing Exponential Coordinates", "完成 HW2 PDF Problem 3：理解 3D hat、rotation_3d、hat_3d、homog_3d、prod_exp 的数学定义。"),
      coding: code("Code: kin_func_skeleton.py", "在 hw2_starter.zip 的 kin_func_skeleton.py 中实现 skew_3d、rotation_3d、hat_3d、homog_3d、prod_exp。", "def skew_3d(omega): ...\ndef rotation_3d(omega, theta): ...\ndef hat_3d(xi): ...\ndef homog_3d(xi, theta): ...\ndef prod_exp(xi, theta): ...", "批改重点：hat map 符号、Rodrigues 公式、SE(3) 指数、POE 连乘顺序和返回矩阵维度。")
    },
    {
      label: "P4 Satellite + hw2.py",
      qa: written("Problem 4: Satellite System", "完成 HW2 PDF Problem 4：推导 T02(0)、T02(t)、xi2、T01(t)、T21(t)、xi1，并把对应结果实现到 hw2.py。"),
      coding: code("Code: hw2.py satellite functions", "在 hw2_starter.zip 的 hw2.py 中实现 g02、g01、g21、xi02、xi01 等函数。", "def g02(t, v2, R2): ...\ndef g01(t, v1, R1): ...\ndef g21(t, v1, R1, v2, R2): ...\ndef xi02(v2, R2): ...\ndef xi01(v1, R1): ...", "批改重点：变换方向、时间变量 t、relative transform T21、twist 与推导一致。")
    }
  ],
  hw3: [
    { label: "P2 Screw Joint FK", qa: written("Problem 2: Forward Kinematics with a Screw Joint", "完成 HW3 PDF Problem 2：求含 pitch h=2 screw joint 的 3DOF 机械臂 G_sb(0)、三个 twists 和 POE FK。"), coding: code("Code: hw3.py Problem 2", "把 Problem 2 的 G(0)、twists 和 FK map 实现到 hw3.py。", "# Implement HW3 Problem 2 FK in hw3.py\n", "批改重点：screw joint 的 v=-omega x q + h omega；连杆长度 L1=10,L2=L3=5,L4=3；POE 顺序。") },
    { label: "P3 Stanford Arm FK", qa: written("Problem 3: Forward Kinematics for 6 DOF Manipulators", "完成 HW3 PDF Problem 3：求 Stanford arm 的 G_ST(0)、六个 joint twists 和 POE FK。"), coding: code("Code: hw3.py Problem 3", "把 Stanford arm 6DOF FK 实现到 hw3.py，并使用 HW2 的 kin_func_skeleton.py。", "# Implement HW3 Problem 3 Stanford arm FK in hw3.py\n", "批改重点：joint 3 是 prismatic；5 个 revolute + 1 个 prismatic；q_w 和 q1 距离假设使用正确。") },
    { label: "P4 Frenet-Serret", qa: written("Problem 4: Frenet-Serret Racing, Inc.", "完成 HW3 PDF Problem 4：证明 unit tangent、normal orthogonality，构造 Frenet-Serret frame 到 world frame 的 G_AB(s)，并解释对车辆轨迹姿态的作用。"), coding: noCode }
  ],
  hw4: [
    { label: "P2 Stanford IK", qa: written("Problem 2: Inverse Kinematics for 6DOF Manipulators", "完成 HW4 PDF Problem 2：描述 Stanford arm reachable/dexterous workspace，用 Paden-Kahan subproblems 分解 IK，并说明最大解数。"), coding: noCode }
  ],
  hw5: [
    { label: "P2 Epipolar/SfM", qa: written("Problem 2: Epipolar Ambiguities and Structure from Motion", "完成 HW5 PDF Problem 2：证明 essential matrix 只能恢复到 scale，三相机 translation scales 只能恢复到整体 scale，以及已知 T12 后的尺度恢复。"), coding: noCode },
    { label: "P3 Planar Motion", qa: written("Problem 3: Planar Motion Models", "完成 HW5 PDF Problem 3：证明特定 3D rigid motion 在平行平面物体图像上对应 translation model 和 affine model。"), coding: noCode },
    {
      label: "P4 Notebook Part a",
      qa: written("Problem 4a: Geometry in the time of deep learning", "完成 HW5 PDF Problem 4(a)：用世界坐标轨迹和 K_f 把未来轨迹点投影到前视图像，并提交截图。"),
      coding: code("Code: geometry_learning.ipynb world_pt_to_pixel", "在 hw5_starter.zip 的 geometry_learning.ipynb 中实现 world_pt_to_pixel(point, K)。", "def world_pt_to_pixel(point, K):\n    # transform world point to camera/pixel coordinates as requested by HW5\n    pass", "批改重点：frame 变换、homogeneous projection、除以 depth、像素坐标顺序。")
    },
    {
      label: "P4 Notebook Part b/c",
      qa: written("Problem 4b/c: Camera calibration and safety check", "完成 HW5 PDF Problem 4(b)(c)：调 focal length f，使预测停止点对齐 lane marking，并用该 f 判断后续轨迹是否安全。"),
      coding: code("Code: geometry_learning.ipynb world_pt_f_to_pixel", "在 hw5_starter.zip 的 notebook 中实现 world_pt_f_to_pixel(point, f, img_height, img_width)，调参并提交最终截图。", "def world_pt_f_to_pixel(point, f, img_height, img_width):\n    # construct K from f/image size and project point\n    pass", "批改重点：K 矩阵构造、f 调参、截图展示、轨迹安全判断。")
    }
  ],
  hw6: [
    { label: "P2 Twists as Velocities", qa: written("Problem 2: Twists as Velocities", "完成 HW6 PDF Problem 2：用 matrix logarithm 思路从 g0/g1 构造 constant screw trajectory，并求 spatial/body velocity，解释 twist 作为速度。"), coding: noCode },
    { label: "P3 Velocities as Twists", qa: written("Problem 3: Velocities as Twists", "完成 HW6 PDF Problem 3：从 R(t+dt)=exp(omega_hat dt)R(t) 推导 spatial angular velocity，并推广到 SE(3) 的 spatial velocity。"), coding: noCode },
    { label: "P4 Adjoint Properties", qa: written("Problem 4: Properties of the Adjoint", "完成 HW6 PDF Problem 4：证明 (Ad_g)^-1=Ad_{g^-1} 和 Ad_{g1 g2}=Ad_{g1}Ad_{g2}。"), coding: noCode }
  ],
  hw7: [
    { label: "P2 Euler Singularities", qa: written("Problem 2: Singularities of Euler Angles", "完成 HW7 PDF Problem 2：证明 ZYX Euler angle 在 theta_y=pi/2 的 singularity，并证明三任意轴旋转参数化存在 singularity。"), coding: noCode },
    { label: "P3 Coplanar Axes", qa: written("Problem 3: Kinematic Singularity: four coplanar revolute joints", "完成 HW7 PDF Problem 3：证明 6DOF manipulator 中若四个 revolute joint axes 共面，则处于 singular configuration。"), coding: noCode },
    { label: "P4 Manipulability", qa: written("Problem 4: Manipulability Agility Ability", "完成 HW7 PDF Problem 4：证明 singular Jacobian 导致至少一个 singular value 为 0，manipulability 为 0，并绘制 ZYX Euler angle 的 manipulability 曲线。"), coding: noCode }
  ],
  hw8: [
    { label: "P2 Rotational Inertia", qa: written("Problem 2: Rotational Inertia", "完成 HW8 PDF Problem 2：离散粒子杆模型位置、速度、平方和归纳证明、总动能极限，并得到刚性杆 inertia。"), coding: noCode },
    { label: "P3 Spacecraft Dynamics", qa: written("Problem 3: Spacecraft Dynamics", "完成 HW8 PDF Problem 3：写 spacecraft + reaction wheel 的总 kinetic energy，并用 Lagrange equation 推导 thrusters 和 flywheel torque 下的 EOM。"), coding: noCode },
    {
      label: "P4 Code hw8.py",
      qa: written("Problem 4: Robotic Legs & The Double Pendulum", "完成 HW8 PDF Problem 4：为双摆机器人腿选择 generalized coordinates，推导 T、V、L、M、C、N 和 generalized forces 的物理意义。"),
      coding: code("Code: hw8.py SymPy double pendulum", "在 hw8_starter.zip 的 assignment/hw8.py 中填完整个 SymPy 推导：质心位置、速度、T、V、L、偏导、M、C、N。", "cm1_xy = ...\ncm2_xy = ...\ncm1_xy_vel = ...\ncm2_xy_vel = ...\nT = ...\nV = ...\nL = ...\ndL_dq = ...\ndL_dq_dot = ...\ndL_dq_dot_dt = ...\nM = ...\nC = ...\nN = ...", "批改重点：质心几何、平动/转动动能、势能符号、Euler-Lagrange 偏导、M/C/N 分解和 SymPy 表达式可运行。")
    }
  ],
  hw9: [
    { label: "P2 OSIRIS-RExploring", qa: written("Problem 2: OSIRIS-RExploring", "完成 HW9 PDF Problem 2：围绕 circular orbit 线性化卫星系统，判断无 thruster 时线性系统稳定性，并判断 controllability。"), coding: noCode },
    { label: "P3 SpaceMax", qa: written("Problem 3: SpaceMax", "完成 HW9 PDF Problem 3：写 gimbaled rocket generalized coordinates、Lagrangian、EOM、generalized forces，并推导 fixed gimbal angle 下实现 PD error dynamics 的 thrust force。"), coding: noCode }
  ]
};
