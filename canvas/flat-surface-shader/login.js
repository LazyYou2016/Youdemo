$(function () {
    if (!window.ActiveXObject && !!document.createElement("canvas").getContext) {
        $.getScript("fss.min.js",
            function () {
                var t = {
                    width: 1.5,
                    height: 1.5,
                    depth: 10,
                    segments: 12,
                    slices: 6,
                    xRange: 0.8,
                    yRange: 0.1,
                    zRange: 1,
                    ambient: "#525252",
                    diffuse: "#FFFFFF",
                    speed: 0.0002
                };
                var G = {
                    count: 2,
                    xyScalar: 1,
                    zOffset: 100,
                    ambient: "#005584",
                    diffuse: "#005584",
                    speed: 0.001,
                    gravity: 1200,
                    dampening: 0.95,
                    minLimit: 10,
                    maxLimit: null,
                    minDistance: 20,
                    maxDistance: 400,
                    autopilot: false,
                    draw: false,
                    bounds: FSS.Vector3.create(),
                    step: FSS.Vector3.create(Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1))
                };
                var m = "canvas";
                var E = "svg";
                var x = {
                    renderer: m
                };
                var i, n = Date.now();
                var L = FSS.Vector3.create();
                var k = FSS.Vector3.create();
                var z = document.getElementById("container");
                var w = document.getElementById("anitOut");
                var D, I, h, q, y;
                var g;
                var r;

                function C() {
                    F();
                    p();
                    s();
                    B();
                    v();
                    K(z.offsetWidth, z.offsetHeight);
                    o()
                }

                function F() {
                    g = new FSS.CanvasRenderer();
                    H(x.renderer)
                }

                function H(N) {
                    if (D) {
                        w.removeChild(D.element)
                    }
                    switch (N) {
                        case m:
                            D = g;
                            break
                    }
                    D.setSize(z.offsetWidth, z.offsetHeight);
                    w.appendChild(D.element)
                }

                function p() {
                    I = new FSS.Scene()
                }

                function s() {
                    I.remove(h);
                    D.clear();
                    q = new FSS.Plane(t.width * D.width, t.height * D.height, t.segments, t.slices);
                    y = new FSS.Material(t.ambient, t.diffuse);
                    h = new FSS.Mesh(q, y);
                    I.add(h);
                    var N, O;
                    for (N = q.vertices.length - 1; N >= 0; N--) {
                        O = q.vertices[N];
                        O.anchor = FSS.Vector3.clone(O.position);
                        O.step = FSS.Vector3.create(Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1));
                        O.time = Math.randomInRange(0, Math.PIM2)
                    }
                }

                function B() {
                    var O, N;
                    for (O = I.lights.length - 1; O >= 0; O--) {
                        N = I.lights[O];
                        I.remove(N)
                    }
                    D.clear();
                    for (O = 0; O < G.count; O++) {
                        N = new FSS.Light(G.ambient, G.diffuse);
                        N.ambientHex = N.ambient.format();
                        N.diffuseHex = N.diffuse.format();
                        I.add(N);
                        N.mass = Math.randomInRange(0.5, 1);
                        N.velocity = FSS.Vector3.create();
                        N.acceleration = FSS.Vector3.create();
                        N.force = FSS.Vector3.create()
                    }
                }

                function K(O, N) {
                    D.setSize(O, N);
                    FSS.Vector3.set(L, D.halfWidth, D.halfHeight);
                    s()
                }

                function o() {
                    i = Date.now() - n;
                    u();
                    M();
                    requestAnimationFrame(o)
                }

                function u() {
                    var Q, P, O, R, T, V, U, S = t.depth / 2;
                    FSS.Vector3.copy(G.bounds, L);
                    FSS.Vector3.multiplyScalar(G.bounds, G.xyScalar);
                    FSS.Vector3.setZ(k, G.zOffset);
                    for (R = I.lights.length - 1; R >= 0; R--) {
                        T = I.lights[R];
                        FSS.Vector3.setZ(T.position, G.zOffset);
                        var N = Math.clamp(FSS.Vector3.distanceSquared(T.position, k), G.minDistance, G.maxDistance);
                        var W = G.gravity * T.mass / N;
                        FSS.Vector3.subtractVectors(T.force, k, T.position);
                        FSS.Vector3.normalise(T.force);
                        FSS.Vector3.multiplyScalar(T.force, W);
                        FSS.Vector3.set(T.acceleration);
                        FSS.Vector3.add(T.acceleration, T.force);
                        FSS.Vector3.add(T.velocity, T.acceleration);
                        FSS.Vector3.multiplyScalar(T.velocity, G.dampening);
                        FSS.Vector3.limit(T.velocity, G.minLimit, G.maxLimit);
                        FSS.Vector3.add(T.position, T.velocity)
                    }
                    for (V = q.vertices.length - 1; V >= 0; V--) {
                        U = q.vertices[V];
                        Q = Math.sin(U.time + U.step[0] * i * t.speed);
                        P = Math.cos(U.time + U.step[1] * i * t.speed);
                        O = Math.sin(U.time + U.step[2] * i * t.speed);
                        FSS.Vector3.set(U.position, t.xRange * q.segmentWidth * Q, t.yRange * q.sliceHeight * P, t.zRange * S * O - S);
                        FSS.Vector3.add(U.position, U.anchor)
                    }
                    q.dirty = true
                }

                function M() {
                    D.render(I)
                }

                function J(O) {
                    var Q, N, S = O;
                    var P = function (T) {
                        for (Q = 0, l = I.lights.length; Q < l; Q++) {
                            N = I.lights[Q];
                            N.ambient.set(T);
                            N.ambientHex = N.ambient.format()
                        }
                    };
                    var R = function (T) {
                        for (Q = 0, l = I.lights.length; Q < l; Q++) {
                            N = I.lights[Q];
                            N.diffuse.set(T);
                            N.diffuseHex = N.diffuse.format()
                        }
                    };
                    return {
                        set: function () {
                            P(S[0]);
                            R(S[1])
                        }
                    }
                }

                function v() {
                    window.addEventListener("resize", j)
                }

                function A(N) {
                    FSS.Vector3.set(k, N.x, D.height - N.y);
                    FSS.Vector3.subtract(k, L)
                }

                function j(N) {
                    K(z.offsetWidth, z.offsetHeight);
                    M()
                }

                C();
            })
    } else {
        alert('调用FSS.js失败');
    }
});