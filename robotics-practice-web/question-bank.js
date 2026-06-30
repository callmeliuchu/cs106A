window.extraExercisesByChapter = {
  frames: [
    {
      label: "换基",
      qa: {
        title: "换基矩阵的列向量",
        prompt: "设 beta = {b1,b2,b3} 是一组正交单位基。解释为什么从 beta 坐标到标准坐标的矩阵可以直接把 b1,b2,b3 作为列向量。再说明非正交基时哪里会变复杂。",
        rubric: "应说明列向量是新基在旧基中的表达；坐标线性组合 p = B p_beta；非正交基仍可用基矩阵，但投影不能简单用点积。"
      },
      coding: {
        title: "坐标变换链",
        prompt: "写函数 transform_chain(transforms, point)，输入一组 4x4 变换 [G_ab, G_bc, ...] 和最后一个坐标系中的齐次点，返回第一个坐标系中的点。",
        starter: "import numpy as np\n\ndef transform_chain(transforms, point):\n    G = np.eye(4)\n    # multiply transforms in order\n    pass",
        reference: "按顺序左到右累乘 G = G @ T，最后返回 G @ point。要注意输入 point 是 4 维齐次点。"
      }
    },
    {
      label: "点与向量",
      qa: {
        title: "齐次点和齐次向量",
        prompt: "为什么齐次坐标中点的最后一维是 1，而自由向量的最后一维是 0？用一个带平移的 G 说明两者变换结果有什么不同。",
        rubric: "应说明平移只作用在点上；G [p;1] 得到 Rp+t，G [v;0] 得到 Rv。"
      },
      coding: {
        title: "批量变换点和向量",
        prompt: "写函数 apply_transform(G, X, is_point=True)，X 是 n x 3 数组。is_point 为 True 时应用旋转和平移，为 False 时只应用旋转。",
        starter: "import numpy as np\n\ndef apply_transform(G, X, is_point=True):\n    R = G[:3, :3]\n    t = G[:3, 3]\n    pass",
        reference: "点: X @ R.T + t；向量: X @ R.T。也可构造齐次坐标批量相乘。"
      }
    },
    {
      label: "逆变换",
      qa: {
        title: "为什么不能直接把平移取负",
        prompt: "对 G_AB = [R p; 0 1]，解释为什么 G_BA 的平移不是简单的 -p，而是 -R^T p。给出几何直觉。",
        rubric: "应说明 -p 仍在 A 坐标系表达，需要先转到 B 坐标系；逆变换是先反平移再反旋转。"
      },
      coding: {
        title: "验证逆变换",
        prompt: "写函数 is_inverse(G, H, tol)，判断两个 4x4 矩阵是否互为逆。要求同时检查 G@H 和 H@G。",
        starter: "import numpy as np\n\ndef is_inverse(G, H, tol=1e-8):\n    I = np.eye(4)\n    pass",
        reference: "使用 np.allclose(G @ H, I, atol=tol) and np.allclose(H @ G, I, atol=tol)。"
      }
    },
    {
      label: "调试",
      qa: {
        title: "frame 错误排查",
        prompt: "如果你得到的机械臂末端位置看起来绕错方向或平移错位，列出三种最常见的 frame/矩阵顺序错误和排查方法。",
        rubric: "可提到 R_AB/R_BA 写反、左乘右乘顺序错、点和向量混用、初始位姿 G(0) 坐标系错；排查可用单位轴和简单角度测试。"
      },
      coding: {
        title: "构造测试用例",
        prompt: "写一个小测试，验证 z 轴旋转 90 度后，点 (1,0,0) 变为 (0,1,0)。要求用断言表达。",
        starter: "import numpy as np\n\ndef test_rot_z_90(rot_z):\n    p = np.array([1.0, 0.0, 0.0])\n    # assert expected result\n    pass",
        reference: "R = rot_z(np.pi/2)，np.testing.assert_allclose(R @ p, [0,1,0], atol=...)。"
      }
    }
  ],
  so3: [
    {
      label: "Euler",
      qa: {
        title: "Intrinsic 与 Extrinsic",
        prompt: "解释 intrinsic ZYX 和 extrinsic XYZ 为什么容易混淆。它们在矩阵乘法顺序上有什么对应关系？",
        rubric: "应说明 intrinsic 绕移动轴，extrinsic 绕固定轴；同一物理旋转可用相反顺序的固定轴/移动轴表达。"
      },
      coding: {
        title: "实现 RzRyRx",
        prompt: "写函数 euler_zyx(yaw, pitch, roll)，返回 extrinsic Z-Y-X 顺序的旋转矩阵 Rz(yaw) @ Ry(pitch) @ Rx(roll)。",
        starter: "import numpy as np\nimport math\n\ndef euler_zyx(yaw, pitch, roll):\n    # build Rz, Ry, Rx\n    pass",
        reference: "分别构造三轴旋转矩阵，按 Rz @ Ry @ Rx 返回。检查零角度时为 I。"
      }
    },
    {
      label: "轴角",
      qa: {
        title: "旋转轴为什么是不变方向",
        prompt: "若 R = exp(omega_hat theta)，解释为什么 omega 是 R 的特征值 1 对应的方向。theta=pi 时提取轴角有什么歧义？",
        rubric: "应说明绕轴旋转不会改变轴向量；theta=pi 时符号和数值稳定性更敏感，轴方向可能有正负等价。"
      },
      coding: {
        title: "检查 SO(3)",
        prompt: "写函数 is_so3(R)，同时检查正交性和 det 是否接近 1。",
        starter: "import numpy as np\n\ndef is_so3(R, tol=1e-8):\n    pass",
        reference: "检查 R.shape、np.allclose(R.T@R, I) 和 abs(np.linalg.det(R)-1)<tol。"
      }
    },
    {
      label: "Log",
      qa: {
        title: "旋转矩阵到角度",
        prompt: "说明为什么 tr(R) = 1 + 2 cos(theta)。这个公式在 theta 接近 0 或 pi 时有什么数值问题？",
        rubric: "应引用 Rodrigues 公式或特征值；acos 在边界附近对噪声敏感，需要 clip。"
      },
      coding: {
        title: "从 R 提取旋转角",
        prompt: "写函数 rotation_angle(R)，用 trace 公式返回 theta，并处理浮点误差。",
        starter: "import numpy as np\nimport math\n\ndef rotation_angle(R):\n    c = None\n    pass",
        reference: "c = (trace(R)-1)/2；c = np.clip(c,-1,1)；return math.acos(c)。"
      }
    },
    {
      label: "投影",
      qa: {
        title: "近似旋转矩阵的修正",
        prompt: "数值计算得到的 R 可能不完全满足 R^T R=I。说明如何用 SVD 把它投影回最近的旋转矩阵。",
        rubric: "应说明 R=U S V^T，取 R_proj=U V^T，并在 det<0 时修正一列符号。"
      },
      coding: {
        title: "SVD 投影到 SO(3)",
        prompt: "写函数 project_to_so3(M)，把一个近似 3x3 矩阵投影到 SO(3)。",
        starter: "import numpy as np\n\ndef project_to_so3(M):\n    U, _, Vt = np.linalg.svd(M)\n    pass",
        reference: "R=U@Vt；若 det(R)<0，可令 U[:,-1]*=-1 后重算 R。"
      }
    }
  ],
  se3: [
    {
      label: "Hat",
      qa: {
        title: "se(3) hat map",
        prompt: "给 xi=[v;omega]，写出 xi_hat 的 4x4 形式。为什么右下角必须是 0？",
        rubric: "应写出 [[omega_hat, v],[0,0]]；右下角 0 对应李代数元素，指数后才得到齐次矩阵右下角 1。"
      },
      coding: {
        title: "实现 se3_hat",
        prompt: "写函数 se3_hat(xi)，输入 6 维 [v;omega]，返回 4x4 矩阵。",
        starter: "import numpy as np\n\ndef se3_hat(xi):\n    v = xi[:3]\n    w = xi[3:]\n    pass",
        reference: "左上角是 skew(w)，右上角是 v，最后一行全 0。"
      }
    },
    {
      label: "Prismatic",
      qa: {
        title: "Prismatic 的指数坐标",
        prompt: "解释为什么 prismatic joint 的 omega=0，且 exp(xi_hat theta) 只产生平移 v theta。",
        rubric: "应说明没有角速度；se(3) 指数退化为 I 和线性平移。"
      },
      coding: {
        title: "Prismatic 变换",
        prompt: "写函数 prismatic_transform(v, theta)，返回沿单位方向 v 平移 theta 的 4x4 矩阵。",
        starter: "import numpy as np\n\ndef prismatic_transform(v, theta):\n    G = np.eye(4)\n    pass",
        reference: "G[:3,3] = np.asarray(v) * theta。"
      }
    },
    {
      label: "Screw",
      qa: {
        title: "Pitch 的物理意义",
        prompt: "说明 screw joint 中 pitch h 的物理意义。h=0 和 h 无限大分别对应什么特殊情况？",
        rubric: "h 是单位旋转角对应的轴向平移量；h=0 是纯转动；无限大可理解为纯平移。"
      },
      coding: {
        title: "Screw twist",
        prompt: "写函数 screw_twist(omega, q, h)，返回 [v;omega]，其中 v=-omega x q + h omega。",
        starter: "import numpy as np\n\ndef screw_twist(omega, q, h):\n    pass",
        reference: "v = -np.cross(omega, q) + h * omega；返回 np.r_[v, omega]。"
      }
    },
    {
      label: "Exp",
      qa: {
        title: "矩阵指数的几何解释",
        prompt: "为什么 exp(xi_hat theta) 可以看作让刚体按 twist xi 匀速运动 theta 时间后的位姿变化？",
        rubric: "应联系 g_dot = xi_hat g 或空间速度常值的微分方程，矩阵指数是线性系统解。"
      },
      coding: {
        title: "调用 scipy expm",
        prompt: "写函数 exp_twist(xi, theta)，用 scipy.linalg.expm 返回 exp(xi_hat theta)。",
        starter: "from scipy.linalg import expm\n\ndef exp_twist(xi, theta):\n    # assume se3_hat exists\n    pass",
        reference: "return expm(se3_hat(xi) * theta)。"
      }
    }
  ],
  fk: [
    {
      label: "G0",
      qa: {
        title: "初始位姿 G(0)",
        prompt: "在 POE 公式中，为什么必须单独写 G_ST(0)？如果漏掉它，得到的 FK 表示什么？",
        rubric: "G(0) 是所有关节为零时工具系相对空间系的位姿；漏掉它通常只得到关节运动相对初始工具系的增量。"
      },
      coding: {
        title: "链式 POE",
        prompt: "写函数 poe(twists, thetas, G0, exp_twist)，依次累乘每个 exp(xi_i_hat theta_i)，最后乘 G0。",
        starter: "import numpy as np\n\ndef poe(twists, thetas, G0, exp_twist):\n    G = np.eye(4)\n    pass",
        reference: "for xi,th in zip(...): G = G @ exp_twist(xi, th)；return G @ G0。"
      }
    },
    {
      label: "关节轴",
      qa: {
        title: "如何从图中找 q 和 omega",
        prompt: "对 revolute joint，说明如何从机械臂初始图中选择 omega 和 q。q 是否唯一？为什么？",
        rubric: "omega 是旋转轴方向单位向量；q 是轴上任一点；q 不唯一但 -omega x q 对同一轴给出等价瞬时运动。"
      },
      coding: {
        title: "批量 revolute twists",
        prompt: "写函数 revolute_twists(omegas, qs)，输入 n x 3 的轴方向和轴上点，返回 n x 6 twists。",
        starter: "import numpy as np\n\ndef revolute_twists(omegas, qs):\n    twists = []\n    pass",
        reference: "循环计算 v=-np.cross(w,q)，append np.r_[v,w]，最后 np.array(twists)。"
      }
    },
    {
      label: "验证",
      qa: {
        title: "FK 的 sanity check",
        prompt: "列出三个用于检查 FK 实现是否可信的简单测试。要求包含 theta=0 和单关节运动测试。",
        rubric: "应包含 theta=0 返回 G0；单关节小角度运动方向正确；末端距离/连杆长度保持；与几何解或仿真对比。"
      },
      coding: {
        title: "有限差分速度",
        prompt: "写函数 finite_difference_position(fk, theta, i, eps)，估计末端位置对第 i 个关节的偏导。",
        starter: "import numpy as np\n\ndef finite_difference_position(fk, theta, i, eps=1e-6):\n    theta = np.array(theta, dtype=float)\n    pass",
        reference: "分别计算 theta[i]+=eps 和 -=eps 的末端位置，返回 (p_plus-p_minus)/(2eps)。"
      }
    },
    {
      label: "Stanford",
      qa: {
        title: "Prismatic joint 在 POE 中的 theta",
        prompt: "Stanford arm 的第 3 关节是 prismatic。解释这里的 theta_3 为什么是位移而不是角度，以及 twist 应如何写。",
        rubric: "应说明 prismatic 的关节变量是沿轴平移距离；twist=[v;0]，指数得到 p=v theta。"
      },
      coding: {
        title: "混合关节 FK 参数检查",
        prompt: "写函数 validate_joint_inputs(twists, thetas)，检查 twists 数量和 theta 数量一致，并且每个 twist 是长度 6。",
        starter: "def validate_joint_inputs(twists, thetas):\n    pass",
        reference: "检查 len 相等；逐个检查 len(xi)==6；不满足时 raise ValueError。"
      }
    }
  ],
  ik: [
    {
      label: "Workspace",
      qa: {
        title: "Reachable 与 Dexterous",
        prompt: "解释 reachable workspace 和 dexterous workspace 的区别。为什么 6DOF 机械臂更常讨论 dexterous workspace？",
        rubric: "reachable 只要求位置可达；dexterous 还要求在该位置实现任意或足够多姿态；6DOF 涉及姿态控制。"
      },
      coding: {
        title: "2R 可达性检查",
        prompt: "写函数 reachable_2r(x,y,L1,L2)，判断点是否在 2R 平面机械臂 workspace 内。",
        starter: "import math\n\ndef reachable_2r(x, y, L1, L2, tol=1e-9):\n    r = math.hypot(x, y)\n    pass",
        reference: "|L1-L2| <= r <= L1+L2，考虑 tol。"
      }
    },
    {
      label: "PK",
      qa: {
        title: "Paden-Kahan 的作用",
        prompt: "为什么 Paden-Kahan 子问题适合解机器人 IK？和直接解非线性方程相比，它的优势是什么？",
        rubric: "应说明它把旋转几何拆成标准子问题，利用轴、点和距离约束，能清楚处理多解。"
      },
      coding: {
        title: "角度归一化",
        prompt: "写函数 wrap_to_pi(theta)，把角度映射到 [-pi, pi)。IK 多解比较时会用到。",
        starter: "import math\n\ndef wrap_to_pi(theta):\n    pass",
        reference: "return (theta + pi) % (2*pi) - pi。"
      }
    },
    {
      label: "多解",
      qa: {
        title: "最大解数",
        prompt: "回答 IK 题时为什么要说明最大可能解数？它和机械臂结构、关节限制有什么关系？",
        rubric: "应说明非线性几何会产生离散多解；结构对称、肘部构型、腕部构型和关节范围都会改变可行解数。"
      },
      coding: {
        title: "过滤关节范围",
        prompt: "写函数 filter_joint_limits(solutions, lower, upper)，保留满足逐关节上下界的解。",
        starter: "def filter_joint_limits(solutions, lower, upper):\n    valid = []\n    pass",
        reference: "对每个解检查 all(lo <= q <= hi)，满足则加入 valid。"
      }
    },
    {
      label: "数值 IK",
      qa: {
        title: "解析 IK 与数值 IK",
        prompt: "比较解析 IK 和 Jacobian-based 数值 IK。分别适合什么场景？",
        rubric: "解析法快且能列出多解但依赖结构；数值法通用但需初值、可能收敛到局部或奇异附近不稳定。"
      },
      coding: {
        title: "Jacobian 转置一步",
        prompt: "写函数 ik_step_jt(theta, error, jacobian, alpha)，返回一次 Jacobian transpose 更新后的 theta。",
        starter: "def ik_step_jt(theta, error, jacobian, alpha=0.1):\n    J = jacobian(theta)\n    pass",
        reference: "theta_new = theta + alpha * J.T @ error。实际使用要注意误差维度和步长。"
      }
    }
  ],
  velocities: [
    {
      label: "Body/Spatial",
      qa: {
        title: "同一速度的两种表达",
        prompt: "若 V_s = Ad_g V_b，解释 g 在这里表示什么。什么时候更适合使用 body Jacobian？",
        rubric: "g 是 body frame 相对 spatial frame 的当前位姿；末端局部任务、工具坐标控制或右乘扰动时 body 表达更自然。"
      },
      coding: {
        title: "Body 转 Spatial",
        prompt: "写函数 body_to_spatial(G, Vb, adjoint)，返回 Vs。",
        starter: "def body_to_spatial(G, Vb, adjoint):\n    pass",
        reference: "return adjoint(G) @ Vb。"
      }
    },
    {
      label: "角速度",
      qa: {
        title: "Rdot R^T 的意义",
        prompt: "说明为什么 Rdot R^T 是 skew-symmetric，并且可以看作 spatial angular velocity 的 hat 矩阵。",
        rubric: "从 R R^T=I 求导得 Rdot R^T + R Rdot^T=0，所以它反对称；对应空间系表达的瞬时旋转轴。"
      },
      coding: {
        title: "vee map",
        prompt: "写函数 vee_so3(W)，把 3x3 skew 矩阵还原为向量 omega。",
        starter: "import numpy as np\n\ndef vee_so3(W):\n    pass",
        reference: "若 W=[[0,-wz,wy],[wz,0,-wx],[-wy,wx,0]]，返回 [W[2,1], W[0,2], W[1,0]]。"
      }
    },
    {
      label: "Log 轨迹",
      qa: {
        title: "用 matrix log 生成轨迹",
        prompt: "给定 g0 和 g1，如何用 matrix logarithm 构造从 g0 到 g1 的恒定 screw motion 轨迹？",
        rubric: "求相对变换 g1 g0^{-1} 或 g1 @ inv(g0) 的 log，得到 xi_hat；轨迹可写 exp(xi_hat t) g0。"
      },
      coding: {
        title: "轨迹插值骨架",
        prompt: "写函数 screw_interpolate(g0, xi_hat, t)，返回 exp(xi_hat*t) @ g0。",
        starter: "from scipy.linalg import expm\n\ndef screw_interpolate(g0, xi_hat, t):\n    pass",
        reference: "return expm(xi_hat * t) @ g0。"
      }
    },
    {
      label: "Adjoint 性质",
      qa: {
        title: "Adjoint 的乘法性质",
        prompt: "解释 Ad_{g1 g2} = Ad_{g1} Ad_{g2} 的意义。它为什么符合“先变换再变换”的直觉？",
        rubric: "应说明 Ad 是 SE(3) 对 twist 坐标表达的线性作用；组合刚体变换对应组合线性映射。"
      },
      coding: {
        title: "验证 Adjoint 组合",
        prompt: "写函数 check_adjoint_product(G1, G2, adjoint)，验证 Ad(G1@G2) 和 Ad(G1)@Ad(G2) 是否接近。",
        starter: "import numpy as np\n\ndef check_adjoint_product(G1, G2, adjoint, tol=1e-8):\n    pass",
        reference: "return np.allclose(adjoint(G1 @ G2), adjoint(G1) @ adjoint(G2), atol=tol)。"
      }
    }
  ],
  jacobian: [
    {
      label: "列含义",
      qa: {
        title: "Jacobian 每一列是什么",
        prompt: "在 spatial Jacobian 中，第 i 列为什么是第 i 个关节 twist 被前面关节运动变换后的结果？",
        rubric: "第 i 个关节轴会随前 i-1 个关节运动改变其在空间系的表达，因此需用前缀变换的 Adjoint 作用。"
      },
      coding: {
        title: "数值 rank",
        prompt: "写函数 jacobian_rank(J, tol)，用 SVD 计算数值 rank。",
        starter: "import numpy as np\n\ndef jacobian_rank(J, tol=1e-8):\n    pass",
        reference: "s = np.linalg.svd(J, compute_uv=False)；return np.sum(s > tol)。"
      }
    },
    {
      label: "Manipulability",
      qa: {
        title: "Manipulability 的直觉",
        prompt: "为什么奇异值乘积可以作为 manipulability 度量？它为 0 时表示什么？",
        rubric: "Jacobian 把关节速度球映射为末端速度椭球；奇异值是椭球轴长；乘积为 0 表示体积塌陷到低维。"
      },
      coding: {
        title: "计算 manipulability",
        prompt: "写函数 manipulability(J)，返回所有奇异值的乘积。",
        starter: "import numpy as np\n\ndef manipulability(J):\n    pass",
        reference: "s=np.linalg.svd(J, compute_uv=False)；return float(np.prod(s))。"
      }
    },
    {
      label: "Euler 奇异",
      qa: {
        title: "Gimbal lock",
        prompt: "用 ZYX Euler angles 解释 pitch=pi/2 时为什么会出现 singularity。是哪两个旋转轴重合或线性相关？",
        rubric: "应说明中间角让两个自由度轴对齐，Jacobian 列相关，姿态参数化失去一个局部自由度。"
      },
      coding: {
        title: "扫描奇异点",
        prompt: "写函数 find_low_manipulability(samples, jacobian_fn, threshold)，返回 manipulability 低于阈值的样本。",
        starter: "def find_low_manipulability(samples, jacobian_fn, threshold):\n    bad = []\n    pass",
        reference: "循环样本，计算 J 和 manipulability，低于 threshold 就记录。"
      }
    },
    {
      label: "末端速度",
      qa: {
        title: "从 twist 到点速度",
        prompt: "已知末端 spatial twist V=[v;omega]，如何求工具原点的空间线速度？如果要求工具上另一个点的速度呢？",
        rubric: "工具原点速度是 v 或需按课程约定解释；一般点 p 的速度为 v + omega x p，注意 p 相对表达。"
      },
      coding: {
        title: "点速度",
        prompt: "写函数 point_velocity(V, p)，twist 顺序为 [v;omega]，返回空间点 p 的线速度。",
        starter: "import numpy as np\n\ndef point_velocity(V, p):\n    v = V[:3]\n    w = V[3:]\n    pass",
        reference: "return v + np.cross(w, p)。具体课程约定可能使用不同 v 定义，答题时要说明。"
      }
    }
  ],
  vision: [
    {
      label: "Triangulation",
      qa: {
        title: "两视图三角化",
        prompt: "已知 x1、x2、R、T，说明如何通过两个未知 depth 线性求解 3D 点。噪声存在时应如何处理？",
        rubric: "应写 x1 lambda1 与 R,T,x2 的关系，消去 X；噪声时用最小二乘解 depth。"
      },
      coding: {
        title: "归一化像素射线",
        prompt: "写函数 pixel_to_ray(K, uv)，把像素点变成相机坐标中的归一化射线方向。",
        starter: "import numpy as np\n\ndef pixel_to_ray(K, uv):\n    x = np.array([uv[0], uv[1], 1.0])\n    pass",
        reference: "ray = np.linalg.inv(K) @ x；return ray / np.linalg.norm(ray)。"
      }
    },
    {
      label: "Essential",
      qa: {
        title: "Essential matrix 的尺度",
        prompt: "为什么 E 和 cE 对 epipolar constraint 给出同样约束？这对应相机运动中的哪种不可观测量？",
        rubric: "x2^T cE x1 = c*0 仍为 0；对应平移尺度不可观测。"
      },
      coding: {
        title: "Epipolar residual",
        prompt: "写函数 epipolar_residual(E, x1, x2)，输入齐次图像点，返回标量 x2.T @ E @ x1。",
        starter: "def epipolar_residual(E, x1, x2):\n    pass",
        reference: "return float(x2.T @ E @ x1)。"
      }
    },
    {
      label: "Calibration",
      qa: {
        title: "K 矩阵参数",
        prompt: "解释 K 中 focal length、principal point、skew 的含义。为什么更换相机分辨率后 K 可能需要调整？",
        rubric: "应说明 fx/fy 是像素单位焦距，cx/cy 是主点，skew 是像素轴非正交；分辨率改变会改变像素尺度和主点。"
      },
      coding: {
        title: "构造 K",
        prompt: "写函数 make_K(fx, fy, cx, cy, skew=0)，返回 3x3 相机内参矩阵。",
        starter: "import numpy as np\n\ndef make_K(fx, fy, cx, cy, skew=0.0):\n    pass",
        reference: "返回 [[fx, skew, cx],[0, fy, cy],[0,0,1]]。"
      }
    },
    {
      label: "Planar",
      qa: {
        title: "平面运动模型",
        prompt: "为什么一个与图像平面平行的平面物体在某些刚体运动下可以表现为图像中的平移或仿射变换？",
        rubric: "深度近似一致时投影比例一致；平面和平行条件让 3D 运动在图像上退化为低维变换模型。"
      },
      coding: {
        title: "仿射变换图像点",
        prompt: "写函数 apply_affine(A, d, pts)，对 n x 2 图像点应用 h(x)=A x + d。",
        starter: "import numpy as np\n\ndef apply_affine(A, d, pts):\n    pass",
        reference: "return pts @ A.T + d。"
      }
    }
  ],
  dynamics: [
    {
      label: "Energy",
      qa: {
        title: "T 和 V 的来源",
        prompt: "推导 Lagrangian 时，为什么先写每个质心的位置和速度？转动动能什么时候必须加入？",
        rubric: "动能依赖质心线速度和刚体角速度；有刚体自身转动或连杆有转动惯量时必须加入 1/2 I omega^2。"
      },
      coding: {
        title: "质点动能",
        prompt: "写函数 kinetic_point_mass(m, v)，v 是速度向量，返回 1/2 m ||v||^2。",
        starter: "import numpy as np\n\ndef kinetic_point_mass(m, v):\n    pass",
        reference: "return 0.5 * m * float(np.dot(v, v))。"
      }
    },
    {
      label: "EL",
      qa: {
        title: "Euler-Lagrange 方程",
        prompt: "解释 d/dt(dL/dqdot)-dL/dq=Upsilon 中每一项的物理意义。Upsilon 表示什么？",
        rubric: "dL/dqdot 类似广义动量；dL/dq 表示势能/配置相关项；Upsilon 是非保守或输入广义力。"
      },
      coding: {
        title: "SymPy 求导骨架",
        prompt: "写一段 SymPy 代码骨架，给定 L, q, qdot，计算 dL_dq 和 dL_dqdot。",
        starter: "import sympy as sp\n\ndef lagrange_partials(L, q, qdot):\n    pass",
        reference: "可用 L.diff(q_i)、L.diff(qdot_i) 逐项组成 Matrix。"
      }
    },
    {
      label: "M C N",
      qa: {
        title: "M、C、N 的含义",
        prompt: "说明 M(q)、C(q,qdot)qdot、N(q) 分别对应什么物理项。为什么 C 矩阵本身不唯一？",
        rubric: "M 是惯性，Cqdot 是科氏/离心速度项，N 是重力/势能项；C 只要求乘以 qdot 后总项一致，因此矩阵分配不唯一。"
      },
      coding: {
        title: "提取惯性矩阵思路",
        prompt: "写伪代码说明如何从 upsilon 表达式中按 qddot 系数提取 M 矩阵。",
        starter: "def extract_M(upsilon, qddot):\n    # pseudocode is fine\n    pass",
        reference: "对每一行和每个 qddot_j 调用 coeff(qddot_j)，填入 M[i,j]。"
      }
    },
    {
      label: "Double Pendulum",
      qa: {
        title: "双摆广义坐标",
        prompt: "双摆建模中，如果 q1 是第一杆绝对角，q2 是第二杆相对第一杆角，质心位置该如何组织？为什么这比直接写力平衡更稳？",
        rubric: "第二杆姿态通常是 q1+q2；质心位置由两段几何相加；能量法自动处理约束力，方程更系统。"
      },
      coding: {
        title: "双摆质心位置",
        prompt: "写函数 double_pendulum_com(q1,q2,L)，返回两根均匀杆质心的 2D 位置，假设第一杆从原点向下，第二杆角为 q1+q2。",
        starter: "import math\n\ndef double_pendulum_com(q1, q2, L):\n    # choose x right, y up\n    pass",
        reference: "一种约定：cm1=[L/2 sin q1, -L/2 cos q1]；joint=[L sin q1,-L cos q1]；cm2=joint+[L/2 sin(q1+q2), -L/2 cos(q1+q2)]。"
      }
    }
  ],
  control: [
    {
      label: "Linearize",
      qa: {
        title: "线性化点的选择",
        prompt: "为什么必须说明系统是在哪个平衡点附近线性化？如果选错平衡点，A、B 和稳定性判断会怎样？",
        rubric: "A/B 是局部 Jacobian，依赖平衡点；选错点会得到不对应目标工作状态的局部模型，稳定性结论无效。"
      },
      coding: {
        title: "数值 Jacobian",
        prompt: "写函数 numerical_jacobian(f, x, eps)，用中心差分计算 f 对 x 的 Jacobian。",
        starter: "import numpy as np\n\ndef numerical_jacobian(f, x, eps=1e-6):\n    x = np.array(x, dtype=float)\n    pass",
        reference: "逐维扰动 x +/- eps e_i，列为 (f_plus-f_minus)/(2eps)。"
      }
    },
    {
      label: "Stability",
      qa: {
        title: "特征值稳定性",
        prompt: "连续时间线性系统 xdot=Ax 中，特征值实部如何决定局部稳定性？纯虚特征值意味着什么风险？",
        rubric: "实部全负渐近稳定；有正实部不稳定；纯虚通常临界，需要更细分析，非线性和阻尼会影响。"
      },
      coding: {
        title: "检查连续系统稳定",
        prompt: "写函数 is_stable_continuous(A)，判断所有 eigenvalues 的实部是否小于 0。",
        starter: "import numpy as np\n\ndef is_stable_continuous(A, tol=1e-9):\n    pass",
        reference: "eig=np.linalg.eigvals(A)；return np.all(np.real(eig) < -tol)。"
      }
    },
    {
      label: "Controllability",
      qa: {
        title: "可控性的意义",
        prompt: "解释 controllability matrix 满秩的含义。为什么稳定性差的系统仍可能是可控的？",
        rubric: "满秩表示输入可在局部线性模型中影响所有状态方向；开环不稳定不代表不能通过输入稳定。"
      },
      coding: {
        title: "可控性矩阵",
        prompt: "写函数 controllability_matrix(A,B)，返回 [B, AB, ..., A^{n-1}B]。",
        starter: "import numpy as np\n\ndef controllability_matrix(A, B):\n    n = A.shape[0]\n    blocks = []\n    pass",
        reference: "循环 k=0..n-1，blocks.append(np.linalg.matrix_power(A,k) @ B)，np.hstack(blocks)。"
      }
    },
    {
      label: "PD",
      qa: {
        title: "PD 增益直觉",
        prompt: "在二阶误差方程 e_ddot + Kd e_dot + Kp e = 0 中，Kp 和 Kd 太大或太小分别会出现什么现象？",
        rubric: "Kp 提高回正刚度但过大可能振荡/饱和；Kd 增加阻尼但过大响应慢或噪声敏感；太小收敛慢。"
      },
      coding: {
        title: "质量点 computed torque",
        prompt: "质量点满足 m qddot = u。写函数 pd_force(q,qdot,qd,qd_dot,qd_ddot,m,kp,kd)，返回 u。",
        starter: "def pd_force(q, qdot, qd, qd_dot, qd_ddot, m, kp, kd):\n    pass",
        reference: "u = m * (qd_ddot + kd*(qd_dot-qdot) + kp*(qd-q))。"
      }
    }
  ]
};
