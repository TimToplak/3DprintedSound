!(function(t, e) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var i = e();
    for (var n in i) ("object" == typeof exports ? exports : t)[n] = i[n];
  }
})(this, function() {
  return (function(t) {
    function e(n) {
      if (i[n]) return i[n].exports;
      var o = (i[n] = { exports: {}, id: n, loaded: !1 });
      return t[n].call(o.exports, o, o.exports, e), (o.loaded = !0), o.exports;
    }
    var i = {};
    return (e.m = t), (e.c = i), (e.p = ""), e(0);
  })([
    function(t, e, i) {
      t.exports = i(1);
    },
    function(t, e, i) {
      "use strict";
      function n(t) {
        for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i]);
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        n(i(2)),
        n(i(11)),
        n(i(12)),
        n(i(14)),
        n(i(6)),
        n(i(13)),
        n(i(7)),
        n(i(15)),
        n(i(18)),
        n(i(19)),
        n(i(21)),
        n(i(24)),
        n(i(25)),
        n(i(26)),
        n(i(27)),
        n(i(28)),
        n(i(29)),
        n(i(30));
    },
    function(t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = i(3),
        o = (function() {
          function t(t) {
            (this.baseMesh = new n.ThreeMesh()),
              this.baseMesh.setMesh(t),
              this.baseMesh.analyzeGeometry(),
              (this.stack = new Array());
          }
          return (
            Object.defineProperty(t.prototype, "uvsAndColorUpdate", {
              set: function(t) {
                this.baseMesh.uvsAndColorUpdate = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.addModifier = function(t) {
              t.setModifiable(this.baseMesh), this.stack.push(t);
            }),
            (t.prototype.removeModifier = function(t) {
              var e = this.stack.indexOf(t);
              e > -1 && this.stack.splice(e, 1);
            }),
            (t.prototype.apply = function() {
              this.baseMesh.resetGeometry();
              for (var t = 0; t < this.stack.length; t++) this.stack[t].apply();
              this.baseMesh.postApply();
            }),
            (t.prototype.collapse = function() {
              this.apply(),
                this.baseMesh.collapseGeometry(),
                (this.stack.length = 0);
            }),
            (t.prototype.reset = function() {
              this.baseMesh.resetGeometry();
            }),
            (t.prototype.clear = function() {
              this.stack.length = 0;
            }),
            t
          );
        })();
      e.ModifierStack = o;
    },
    function(t, e, i) {
      "use strict";
      var n =
        (this && this.__extends) ||
        (function() {
          var t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            };
          return function(e, i) {
            function n() {
              this.constructor = e;
            }
            t(e, i),
              (e.prototype =
                null === i
                  ? Object.create(i)
                  : ((n.prototype = i.prototype), new n()));
          };
        })();
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = i(4),
        r = i(8),
        s = i(9),
        c = i(10),
        u = (function(t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (e.uvsAndColorUpdate = !1), e;
          }
          return (
            n(e, t),
            (e.prototype.setMesh = function(t) {
              this.mesh = t;
              for (
                var e = this.mesh.geometry,
                  i = new c.Dictionary(),
                  n = e.vertices,
                  r = n.length,
                  u = e.faces,
                  h = u.length,
                  a = 0;
                a < r;
                a++
              ) {
                var f = new o.ThreeVertex();
                f.setVertex(n[a]), this.vertices.push(f), i.setVal(n[a], f);
              }
              for (var a = 0; a < h; a++) {
                var p = new s.FaceProxy(),
                  l = n[u[a].a],
                  y = n[u[a].b],
                  d = n[u[a].c];
                p.addVertex(i.getVal(l)),
                  p.addVertex(i.getVal(y)),
                  p.addVertex(i.getVal(d)),
                  this.faces.push(p);
              }
            }),
            (e.prototype.postApply = function() {
              var t = this.mesh.geometry;
              if (
                ((t.verticesNeedUpdate = !0),
                (t.normalsNeedUpdate = !0),
                this.uvsAndColorUpdate)
              )
                try {
                  (t.colorsNeedUpdate = !0),
                    (t.uvsNeedUpdate = !0),
                    (t.groupsNeedUpdate = !0),
                    (t.elementsNeedUpdate = !0),
                    (t.lineDistancesNeedUpdate = !0);
                } catch (t) {}
            }),
            (e.prototype.updateMeshPosition = function(t) {
              (this.mesh.position.x += t.x),
                (this.mesh.position.y += t.y),
                (this.mesh.position.z += t.z);
            }),
            e
          );
        })(r.MeshProxy);
      e.ThreeMesh = u;
    },
    function(t, e, i) {
      "use strict";
      var n =
        (this && this.__extends) ||
        (function() {
          var t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            };
          return function(e, i) {
            function n() {
              this.constructor = e;
            }
            t(e, i),
              (e.prototype =
                null === i
                  ? Object.create(i)
                  : ((n.prototype = i.prototype), new n()));
          };
        })();
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = i(5),
        r = (function(t) {
          function e() {
            return t.call(this) || this;
          }
          return (
            n(e, t),
            (e.prototype.setVertex = function(t) {
              (this.vertor = t),
                (this.ox = this.vertor.x),
                (this.oy = this.vertor.y),
                (this.oz = this.vertor.z);
            }),
            Object.defineProperty(e.prototype, "x", {
              get: function() {
                return this.vertor.x;
              },
              set: function(t) {
                this.vertor.x = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "y", {
              get: function() {
                return this.vertor.y;
              },
              set: function(t) {
                this.vertor.y = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "z", {
              get: function() {
                return this.vertor.z;
              },
              set: function(t) {
                this.vertor.z = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            e
          );
        })(o.VertexProxy);
      e.ThreeVertex = r;
    },
    function(t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = i(6),
        o = i(7),
        r = (function() {
          function t() {}
          return (
            (t.prototype.setVertex = function(t) {}),
            (t.prototype.setRatios = function(t, e, i) {
              (this._ratioX = t), (this._ratioY = e), (this._ratioZ = i);
            }),
            (t.prototype.setOriginalPosition = function(t, e, i) {
              (this.ox = t), (this.oy = e), (this.oz = i);
            }),
            Object.defineProperty(t.prototype, "x", {
              get: function() {
                return 0;
              },
              set: function(t) {},
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "y", {
              get: function() {
                return 0;
              },
              set: function(t) {},
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "z", {
              get: function() {
                return 0;
              },
              set: function(t) {},
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getValue = function(t) {
              switch (t) {
                case o.ModConstant.X:
                  return this.x;
                case o.ModConstant.Y:
                  return this.y;
                case o.ModConstant.Z:
                  return this.z;
              }
              return 0;
            }),
            (t.prototype.setValue = function(t, e) {
              switch (t) {
                case o.ModConstant.X:
                  this.x = e;
                  break;
                case o.ModConstant.Y:
                  this.y = e;
                  break;
                case o.ModConstant.Z:
                  this.z = e;
              }
            }),
            Object.defineProperty(t.prototype, "ratioX", {
              get: function() {
                return this._ratioX;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "ratioY", {
              get: function() {
                return this._ratioY;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "ratioZ", {
              get: function() {
                return this._ratioZ;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getRatio = function(t) {
              switch (t) {
                case o.ModConstant.X:
                  return this._ratioX;
                case o.ModConstant.Y:
                  return this._ratioY;
                case o.ModConstant.Z:
                  return this._ratioZ;
              }
              return -1;
            }),
            Object.defineProperty(t.prototype, "originalX", {
              get: function() {
                return this.ox;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "originalY", {
              get: function() {
                return this.oy;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "originalZ", {
              get: function() {
                return this.oz;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getOriginalValue = function(t) {
              switch (t) {
                case o.ModConstant.X:
                  return this.ox;
                case o.ModConstant.Y:
                  return this.oy;
                case o.ModConstant.Z:
                  return this.oz;
              }
              return 0;
            }),
            (t.prototype.reset = function() {
              (this.x = this.ox), (this.y = this.oy), (this.z = this.oz);
            }),
            (t.prototype.collapse = function() {
              (this.ox = this.x), (this.oy = this.y), (this.oz = this.z);
            }),
            Object.defineProperty(t.prototype, "vector", {
              get: function() {
                return new n.Vector3(this.x, this.y, this.z);
              },
              set: function(t) {
                (this.x = t.x), (this.y = t.y), (this.z = t.z);
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "ratioVector", {
              get: function() {
                return new n.Vector3(this.ratioX, this.ratioY, this.ratioZ);
              },
              enumerable: !0,
              configurable: !0
            }),
            t
          );
        })();
      e.VertexProxy = r;
    },
    function(t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = (function() {
        function t(t, e, i) {
          (this.x = t), (this.y = e), (this.z = i);
        }
        return (
          (t.prototype.clone = function() {
            return new t(this.x, this.y, this.z);
          }),
          (t.prototype.equals = function(t) {
            return this.x == t.x && this.y == t.y && this.z == t.z;
          }),
          (t.prototype.zero = function() {
            this.x = this.y = this.z = 0;
          }),
          (t.prototype.negate = function() {
            return new t(-this.x, -this.y, -this.z);
          }),
          (t.prototype.add = function(e) {
            return new t(this.x + e.x, this.y + e.y, this.z + e.z);
          }),
          (t.prototype.subtract = function(e) {
            return new t(this.x - e.x, this.y - e.y, this.z - e.z);
          }),
          (t.prototype.multiplyScalar = function(e) {
            return new t(this.x * e, this.y * e, this.z * e);
          }),
          (t.prototype.multiply = function(e) {
            return new t(this.x * e.x, this.y * e.y, this.z * e.z);
          }),
          (t.prototype.divide = function(e) {
            var i = 1 / e;
            return new t(this.x * i, this.y * i, this.z * i);
          }),
          (t.prototype.normalize = function() {
            var t = this.x * this.x + this.y * this.y + this.z * this.z;
            if (t > 0) {
              var e = 1 / Math.sqrt(t);
              (this.x *= e), (this.y *= e), (this.z *= e);
            }
          }),
          Object.defineProperty(t.prototype, "magnitude", {
            get: function() {
              return Math.sqrt(
                this.x * this.x + this.y * this.y + this.z * this.z
              );
            },
            set: function(t) {
              this.normalize(), (this.x *= t), (this.y *= t), (this.z *= t);
            },
            enumerable: !0,
            configurable: !0
          }),
          (t.prototype.toString = function() {
            return "[" + this.x + " , " + this.y + " , " + this.z + "]";
          }),
          (t.sum = function(t, e) {
            return t.add(e);
          }),
          (t.dot = function(t, e) {
            return t.x * e.x + t.y * e.y + t.z * e.z;
          }),
          (t.cross = function(e, i) {
            return new t(
              e.y * i.z - e.z * i.y,
              e.z * i.x - e.x * i.z,
              e.x * i.y - e.y * i.x
            );
          }),
          (t.distance = function(t, e) {
            var i = t.x - e.x,
              n = t.y - e.y,
              o = t.z - e.z;
            return Math.sqrt(i * i + n * n + o * o);
          }),
          t
        );
      })();
      (i.ZERO = new i(0, 0, 0)), (e.Vector3 = i);
    },
    function(t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = (function() {
        function t() {}
        return t;
      })();
      (i.NONE = 0),
        (i.X = 1),
        (i.Y = 2),
        (i.Z = 4),
        (i.LEFT = -1),
        (i.RIGHT = 1),
        (e.ModConstant = i);
    },
    function(t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = i(7),
        o = (function() {
          function t() {
            (this.uvsAndColorUpdate = !1),
              (this.vertices = new Array()),
              (this.faces = new Array());
          }
          return (
            (t.prototype.setMesh = function(t) {}),
            (t.prototype.updateMeshPosition = function(t) {}),
            (t.prototype.getVertices = function() {
              return this.vertices;
            }),
            (t.prototype.getFaces = function() {
              return this.faces;
            }),
            (t.prototype.analyzeGeometry = function() {
              for (var t, e = this.getVertices().length, i = 0; i < e; i++)
                (t = this.getVertices()[i]),
                  0 == i
                    ? ((this._minX = this._maxX = t.x),
                      (this._minY = this._maxY = t.y),
                      (this._minZ = this._maxZ = t.z))
                    : ((this._minX = Math.min(this._minX, t.x)),
                      (this._minY = Math.min(this._minY, t.y)),
                      (this._minZ = Math.min(this._minZ, t.z)),
                      (this._maxX = Math.max(this._maxX, t.x)),
                      (this._maxY = Math.max(this._maxY, t.y)),
                      (this._maxZ = Math.max(this._maxZ, t.z))),
                  t.setOriginalPosition(t.x, t.y, t.z);
              (this._width = this._maxX - this._minX),
                (this._height = this._maxY - this._minY),
                (this._depth = this._maxZ - this._minZ);
              var o = Math.max(
                  this._width,
                  Math.max(this._height, this._depth)
                ),
                r = Math.min(this._width, Math.min(this._height, this._depth));
              o == this._width && r == this._height
                ? ((this._minAxis = n.ModConstant.Y),
                  (this._midAxis = n.ModConstant.Z),
                  (this._maxAxis = n.ModConstant.X))
                : o == this._width && r == this._depth
                ? ((this._minAxis = n.ModConstant.Z),
                  (this._midAxis = n.ModConstant.Y),
                  (this._maxAxis = n.ModConstant.X))
                : o == this._height && r == this._width
                ? ((this._minAxis = n.ModConstant.X),
                  (this._midAxis = n.ModConstant.Z),
                  (this._maxAxis = n.ModConstant.Y))
                : o == this._height && r == this._depth
                ? ((this._minAxis = n.ModConstant.Z),
                  (this._midAxis = n.ModConstant.X),
                  (this._maxAxis = n.ModConstant.Y))
                : o == this._depth && r == this._width
                ? ((this._minAxis = n.ModConstant.X),
                  (this._midAxis = n.ModConstant.Y),
                  (this._maxAxis = n.ModConstant.Z))
                : o == this._depth &&
                  r == this._height &&
                  ((this._minAxis = n.ModConstant.Y),
                  (this._midAxis = n.ModConstant.X),
                  (this._maxAxis = n.ModConstant.Z));
              for (var i = 0; i < e; i++)
                (t = this.getVertices()[i]),
                  t.setRatios(
                    (t.x - this._minX) / this._width,
                    (t.y - this._minY) / this._height,
                    (t.z - this._minZ) / this._depth
                  );
            }),
            (t.prototype.resetGeometry = function() {
              for (var t = this.getVertices().length, e = 0; e < t; e++) {
                var i = this.getVertices()[e];
                i.reset();
              }
            }),
            (t.prototype.collapseGeometry = function() {
              for (var t = this.getVertices().length, e = 0; e < t; e++) {
                var i = this.getVertices()[e];
                i.collapse();
              }
              this.analyzeGeometry();
            }),
            Object.defineProperty(t.prototype, "minX", {
              get: function() {
                return this._minX;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "minY", {
              get: function() {
                return this._minY;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "minZ", {
              get: function() {
                return this._minZ;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getMin = function(t) {
              switch (t) {
                case n.ModConstant.X:
                  return this._minX;
                case n.ModConstant.Y:
                  return this._minY;
                case n.ModConstant.Z:
                  return this._minZ;
              }
              return -1;
            }),
            Object.defineProperty(t.prototype, "maxX", {
              get: function() {
                return this._maxX;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "maxY", {
              get: function() {
                return this._maxY;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "maxZ", {
              get: function() {
                return this._maxZ;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getMax = function(t) {
              switch (t) {
                case n.ModConstant.X:
                  return this._maxX;
                case n.ModConstant.Y:
                  return this._maxY;
                case n.ModConstant.Z:
                  return this._maxZ;
              }
              return -1;
            }),
            Object.defineProperty(t.prototype, "maxAxis", {
              get: function() {
                return this._maxAxis;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "midAxis", {
              get: function() {
                return this._midAxis;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "minAxis", {
              get: function() {
                return this._minAxis;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.getSize = function(t) {
              switch (t) {
                case n.ModConstant.X:
                  return this._width;
                case n.ModConstant.Y:
                  return this._height;
                case n.ModConstant.Z:
                  return this._depth;
              }
              return -1;
            }),
            Object.defineProperty(t.prototype, "width", {
              get: function() {
                return this._width;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "height", {
              get: function() {
                return this._height;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "depth", {
              get: function() {
                return this._depth;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.postApply = function() {}),
            t
          );
        })();
      e.MeshProxy = o;
    },
    function(t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = (function() {
        function t() {
          this._vertices = [];
        }
        return (
          (t.prototype.addVertex = function(t) {
            this._vertices.push(t);
          }),
          Object.defineProperty(t.prototype, "vertices", {
            get: function() {
              return this._vertices;
            },
            enumerable: !0,
            configurable: !0
          }),
          t
        );
      })();
      e.FaceProxy = i;
    },
    function(t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = (function() {
        function t() {
          this.dic = {};
        }
        return (
          (t.prototype.setVal = function(t, e) {
            var i = this.getKey(t);
            this.dic[i] = e;
          }),
          (t.prototype.getVal = function(t) {
            var e = this.getKey(t);
            return this.dic[e];
          }),
          (t.prototype.getKey = function(t) {
            if ("object" == typeof t) {
              if (t.id) return t.id;
              var e = "d_" + Math.floor(Math.random() * Math.pow(10, 10));
              return (t.id = e), e;
            }
            return t + "";
          }),
          t
        );
      })();
      e.Dictionary = i;
    },
    function(t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = (function() {
        function t(t) {
          void 0 === t && (t = 0), (this.v = t);
        }
        return (
          Object.defineProperty(t.prototype, "value", {
            get: function() {
              return this.v;
            },
            set: function(t) {
              this.v = t;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "phasedValue", {
            get: function() {
              return Math.sin(this.v);
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "absPhasedValue", {
            get: function() {
              return Math.abs(this.phasedValue);
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "normValue", {
            get: function() {
              return (this.phasedValue + 1) / 2;
            },
            enumerable: !0,
            configurable: !0
          }),
          t
        );
      })();
      e.Phase = i;
    },
    function(t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = i(13),
        o = (function() {
          function t(t, e) {
            void 0 === t && (t = 0),
              void 0 === e && (e = 1),
              (this._start = t),
              (this._end = e);
          }
          return (
            Object.defineProperty(t.prototype, "start", {
              get: function() {
                return this._start;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "end", {
              get: function() {
                return this._end;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(t.prototype, "size", {
              get: function() {
                return this._end - this._start;
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.move = function(t) {
              (this._start += t), (this._end += t);
            }),
            (t.prototype.isIn = function(t) {
              return t >= this._start && t <= this._end;
            }),
            (t.prototype.normalize = function(t) {
              return n.XMath.normalize(this._start, this._end, t);
            }),
            (t.prototype.toRange = function(t) {
              return n.XMath.toRange(this._start, this._end, t);
            }),
            (t.prototype.trim = function(t) {
              return n.XMath.trim(this._start, this._end, t);
            }),
            (t.prototype.interpolate = function(t, e) {
              return this.toRange(e.normalize(t));
            }),
            (t.prototype.toString = function() {
              return "[" + this.start + " - " + this.end + "]";
            }),
            t
          );
        })();
      e.Range = o;
    },
    function(t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = (function() {
        function t() {}
        return (
          (t.normalize = function(e, i, n) {
            var o,
              r = i - e;
            return (o = 0 == r ? 1 : t.trim(0, 1, (n - e) / i));
          }),
          (t.toRange = function(t, e, i) {
            var n,
              o = e - t;
            return (n = 0 == o ? 0 : t + (e - t) * i);
          }),
          (t.inInRange = function(t, e, i, n) {
            return (
              void 0 === n && (n = !1), n ? i >= t && i <= e : i > t && i < e
            );
          }),
          (t.sign = function(t, e) {
            return void 0 === e && (e = 0), 0 == t ? e : t > 0 ? 1 : -1;
          }),
          (t.trim = function(t, e, i) {
            return Math.min(e, Math.max(t, i));
          }),
          (t.wrap = function(t, e, i) {
            return i < t ? i + (e - t) : i >= e ? i - (e - t) : i;
          }),
          (t.degToRad = function(t) {
            return (t / 180) * Math.PI;
          }),
          (t.radToDeg = function(t) {
            return (t / Math.PI) * 180;
          }),
          (t.presicion = function(t, e) {
            var i = Math.pow(10, e);
            return Math.round(t * i) / i;
          }),
          (t.uceil = function(t) {
            return t < 0 ? Math.floor(t) : Math.ceil(t);
          }),
          t
        );
      })();
      (i.PI = 3.1415), (e.XMath = i);
    },
    function(t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = (function() {
        function t(t, e) {
          (this.x = t), (this.y = e);
        }
        return (
          (t.prototype.clone = function() {
            return new t(this.x, this.y);
          }),
          (t.prototype.equals = function(t) {
            return this.x == t.x && this.y == t.y;
          }),
          (t.prototype.zero = function() {
            this.x = this.y;
          }),
          (t.prototype.negate = function() {
            return new t(-this.x, -this.y);
          }),
          (t.prototype.add = function(e) {
            return new t(this.x + e.x, this.y + e.y);
          }),
          (t.prototype.subtract = function(e) {
            return new t(this.x - e.x, this.y - e.y);
          }),
          (t.prototype.multiplyScalar = function(e) {
            return new t(this.x * e, this.y * e);
          }),
          (t.prototype.multiply = function(e) {
            return new t(this.x * e.x, this.y * e.y);
          }),
          (t.prototype.divide = function(e) {
            var i = 1 / e;
            return new t(this.x * i, this.y * i);
          }),
          (t.prototype.normalize = function() {
            var t = this.x * this.x + this.y * this.y;
            if (t > 0) {
              var e = 1 / Math.sqrt(t);
              (this.x *= e), (this.y *= e);
            }
          }),
          Object.defineProperty(t.prototype, "magnitude", {
            get: function() {
              return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            set: function(t) {
              this.normalize(), (this.x *= t), (this.y *= t);
            },
            enumerable: !0,
            configurable: !0
          }),
          (t.prototype.toString = function() {
            return "[" + this.x + " , " + this.y + "]";
          }),
          (t.sum = function(t, e) {
            return t.add(e);
          }),
          (t.dot = function(t, e) {
            return t.x * e.x + t.y * e.y;
          }),
          (t.distance = function(t, e) {
            var i = t.x - e.x,
              n = t.y - e.y;
            return Math.sqrt(i * i + n * n);
          }),
          t
        );
      })();
      (i.ZERO = new i(0, 0)), (e.Vector2 = i);
    },
    function(t, e, i) {
      "use strict";
      var n =
        (this && this.__extends) ||
        (function() {
          var t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            };
          return function(e, i) {
            function n() {
              this.constructor = e;
            }
            t(e, i),
              (e.prototype =
                null === i
                  ? Object.create(i)
                  : ((n.prototype = i.prototype), new n()));
          };
        })();
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = i(7),
        r = i(16),
        s = i(14),
        c = i(17),
        u = (function(t) {
          function e(e, i, n) {
            void 0 === e && (e = 0),
              void 0 === i && (i = 0.5),
              void 0 === n && (n = 0);
            var r = t.call(this) || this;
            return (
              (r._constraint = o.ModConstant.NONE),
              (r.switchAxes = !1),
              (r._force = e),
              (r._offset = i),
              (r.angle = n),
              r
            );
          }
          return (
            n(e, t),
            (e.prototype.setModifiable = function(e) {
              t.prototype.setModifiable.call(this, e),
                (this.max = this.switchAxes ? e.midAxis : e.maxAxis),
                (this.min = e.minAxis),
                (this.mid = this.switchAxes ? e.maxAxis : e.midAxis),
                (this.width = e.getSize(this.max)),
                (this.height = e.getSize(this.mid)),
                (this.origin = e.getMin(this.max)),
                (this._diagAngle = Math.atan(this.width / this.height));
            }),
            Object.defineProperty(e.prototype, "force", {
              get: function() {
                return this._force;
              },
              set: function(t) {
                this._force = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "constraint", {
              get: function() {
                return this._constraint;
              },
              set: function(t) {
                this._constraint = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "offset", {
              get: function() {
                return this._offset;
              },
              set: function(t) {
                this._offset = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "diagAngle", {
              get: function() {
                return this._diagAngle;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "angle", {
              get: function() {
                return this._angle;
              },
              set: function(t) {
                (this._angle = t),
                  (this.m1 = new c.Matrix(1, 0, 0, 1)),
                  this.m1.rotate(this._angle),
                  (this.m2 = new c.Matrix(1, 0, 0, 1)),
                  this.m2.rotate(-this._angle);
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.apply = function() {
              if (0 != this.force)
                for (
                  var t = this.mod.getVertices(),
                    e = t.length,
                    i = this.origin + this.width * this.offset,
                    n = this.width / Math.PI / this.force,
                    r = 2 * Math.PI * (this.width / (n * Math.PI * 2)),
                    c = 0;
                  c < e;
                  c++
                ) {
                  var u = t[c],
                    h = u.getValue(this.max),
                    a = u.getValue(this.mid),
                    f = u.getValue(this.min),
                    p = this.m1.transformPoint(new s.Vector2(h, a));
                  (h = p.x), (a = p.y);
                  var l = (h - this.origin) / this.width;
                  if (
                    (this.constraint == o.ModConstant.LEFT &&
                      l <= this.offset) ||
                    (this.constraint == o.ModConstant.RIGHT && l >= this.offset)
                  );
                  else {
                    var y = Math.PI / 2 - r * this.offset + r * l,
                      d = Math.sin(y) * (n + f),
                      _ = Math.cos(y) * (n + f);
                    (f = d - n), (h = i - _);
                  }
                  var v = this.m2.transformPoint(new s.Vector2(h, a));
                  (h = v.x),
                    (a = v.y),
                    u.setValue(this.max, h),
                    u.setValue(this.mid, a),
                    u.setValue(this.min, f);
                }
            }),
            e
          );
        })(r.Modifier);
      e.Bend = u;
    },
    function(t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = (function() {
        function t() {}
        return (
          (t.prototype.setModifiable = function(t) {
            this.mod = t;
          }),
          (t.prototype.getVertices = function() {
            return this.mod.getVertices();
          }),
          t
        );
      })();
      e.Modifier = i;
    },
    function(t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = i(14),
        o = (function() {
          function t(t, e, i, n) {
            this.m = [t, e, i, n];
          }
          return (
            (t.prototype.dispose = function() {
              return (this.m.length = 0), this;
            }),
            (t.prototype.reset = function() {
              return (
                (this.m[0] = 1),
                (this.m[1] = 0),
                (this.m[2] = 0),
                (this.m[3] = 1),
                this
              );
            }),
            (t.prototype.rotate = function(t) {
              var e = Math.cos(t),
                i = Math.sin(t);
              return (
                (this.m[0] = e),
                (this.m[1] = -i),
                (this.m[2] = i),
                (this.m[3] = e),
                this
              );
            }),
            (t.prototype.scale = function(t, e) {
              return (
                (this.m[0] = 1),
                (this.m[1] = 0),
                (this.m[2] = 0),
                (this.m[3] = 1),
                void 0 !== t && ((this.m[0] = t), (this.m[3] = t)),
                void 0 !== e && (this.m[3] = e),
                this
              );
            }),
            (t.prototype.multiply = function(e) {
              return t.mult(this, e);
            }),
            (t.prototype.transformPoint = function(e) {
              var i = t.transform(this, [e.x, e.y]);
              return new n.Vector2(i[0], i[1]);
            }),
            (t.prototype.transformPointSelf = function(e) {
              var i = t.transform(this, [e.x, e.y]);
              return (e.x = i[0]), (e.y = i[1]), e;
            }),
            (t.prototype.clone = function() {
              var e = this.m;
              return new t(e[0], e[1], e[2], e[3]);
            }),
            (t.transform = function(t, e) {
              var i = t.m,
                n = e[0],
                o = e[1];
              return (
                (e[0] = i[0] * n + i[1] * o), (e[1] = i[2] * n + i[3] * o), e
              );
            }),
            (t.mult = function(t, e) {
              var i = t.m,
                n = e.m,
                o = i[0],
                r = i[1],
                s = i[2],
                c = i[3];
              return (
                (i[0] = o * n[0] + r * n[2]),
                (i[1] = o * n[1] + r * n[3]),
                (i[2] = s * n[0] + c * n[2]),
                (i[3] = s * n[1] + c * n[3]),
                t
              );
            }),
            t
          );
        })();
      e.Matrix = o;
    },
    function(t, e, i) {
      "use strict";
      var n =
        (this && this.__extends) ||
        (function() {
          var t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            };
          return function(e, i) {
            function n() {
              this.constructor = e;
            }
            t(e, i),
              (e.prototype =
                null === i
                  ? Object.create(i)
                  : ((n.prototype = i.prototype), new n()));
          };
        })();
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = i(6),
        r = i(16),
        s = (function(t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (
              (e._center = o.Vector3.ZERO),
              (e._r = 0),
              (e._a = 0.01),
              (e._u = o.Vector3.ZERO),
              e
            );
          }
          return (
            n(e, t),
            Object.defineProperty(e.prototype, "center", {
              get: function() {
                return this._center;
              },
              set: function(t) {
                this._center = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "radius", {
              get: function() {
                return this._r;
              },
              set: function(t) {
                this._r = Math.max(0, t);
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "a", {
              get: function() {
                return this._a;
              },
              set: function(t) {
                this._a = Math.max(0, t);
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.apply = function() {
              for (
                var t = this.mod.getVertices(), e = 0, i = t;
                e < i.length;
                e++
              ) {
                var n = i[e],
                  o = n;
                (this._u.x = o.x - this._center.x),
                  (this._u.y = o.y - this._center.y),
                  (this._u.z = o.z - this._center.z),
                  (this._u.magnitude +=
                    this._r * Math.exp(-this._u.magnitude * this._a)),
                  (o.x = this._u.x + this._center.x),
                  (o.y = this._u.y + this._center.y),
                  (o.z = this._u.z + this._center.z);
              }
            }),
            e
          );
        })(r.Modifier);
      e.Bloat = s;
    },
    function(t, e, i) {
      "use strict";
      var n =
        (this && this.__extends) ||
        (function() {
          var t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            };
          return function(e, i) {
            function n() {
              this.constructor = e;
            }
            t(e, i),
              (e.prototype =
                null === i
                  ? Object.create(i)
                  : ((n.prototype = i.prototype), new n()));
          };
        })();
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = i(12),
        r = i(6),
        s = i(20),
        c = i(16),
        u = (function(t) {
          function e(e, i) {
            void 0 === e && (e = 0), void 0 === i && (i = 0);
            var n = t.call(this) || this;
            return (
              (n.bv = new r.Vector3(0, 1, 0)),
              (n.range = new o.Range(0, 1)),
              (n.angle = i),
              (n._offset = e),
              n
            );
          }
          return (
            n(e, t),
            (e.prototype.apply = function() {
              for (
                var t = this.mod.getVertices(),
                  e = t.length,
                  i = new r.Vector3(
                    0,
                    0,
                    -(this.mod.minZ + this.mod.depth * this.offset)
                  ),
                  n = 0;
                n < e;
                n++
              ) {
                var o = t[n],
                  c = o.vector;
                if (((c = c.add(i)), c.z >= 0 && this.range.isIn(o.ratioY))) {
                  var u = this.angle,
                    h = s.Matrix4.rotationMatrix(
                      this.bv.x,
                      this.bv.y,
                      this.bv.z,
                      u
                    );
                  s.Matrix4.multiplyVector(h, c);
                }
                var a = i.negate();
                (c = c.add(a)), (o.x = c.x), (o.y = c.y), (o.z = c.z);
              }
            }),
            Object.defineProperty(e.prototype, "offset", {
              get: function() {
                return this._offset;
              },
              set: function(t) {
                this._offset = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            e
          );
        })(c.Modifier);
      e.Break = u;
    },
    function(t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = (function() {
        function t(t, e, i, n, o, r, s, c, u, h, a, f, p, l, y, d) {
          void 0 === t && (t = 1),
            void 0 === e && (e = 0),
            void 0 === i && (i = 0),
            void 0 === n && (n = 0),
            void 0 === o && (o = 0),
            void 0 === r && (r = 1),
            void 0 === s && (s = 0),
            void 0 === c && (c = 0),
            void 0 === u && (u = 0),
            void 0 === h && (h = 0),
            void 0 === a && (a = 1),
            void 0 === f && (f = 0),
            void 0 === p && (p = 0),
            void 0 === l && (l = 0),
            void 0 === y && (y = 0),
            void 0 === d && (d = 1),
            (this.n11 = t),
            (this.n12 = e),
            (this.n13 = i),
            (this.n14 = n),
            (this.n21 = o),
            (this.n22 = r),
            (this.n23 = s),
            (this.n24 = c),
            (this.n31 = u),
            (this.n32 = h),
            (this.n33 = a),
            (this.n34 = f),
            (this.n41 = p),
            (this.n42 = l),
            (this.n43 = y),
            (this.n44 = d);
        }
        return (
          (t.translationMatrix = function(e, i, n) {
            var o = new t();
            return (o.n14 = e), (o.n24 = i), (o.n34 = n), o;
          }),
          (t.scaleMatrix = function(e, i, n) {
            var o = new t();
            return (o.n11 = e), (o.n22 = i), (o.n33 = n), o;
          }),
          (t.rotationMatrix = function(e, i, n, o, r) {
            void 0 === r && (r = null);
            var s;
            s = r ? r : new t();
            var c = Math.cos(o),
              u = Math.sin(o),
              h = 1 - c,
              a = e * i * h,
              f = i * n * h,
              p = e * n * h,
              l = u * n,
              y = u * i,
              d = u * e;
            return (
              (s.n11 = c + e * e * h),
              (s.n12 = -l + a),
              (s.n13 = y + p),
              (s.n14 = 0),
              (s.n21 = l + a),
              (s.n22 = c + i * i * h),
              (s.n23 = -d + f),
              (s.n24 = 0),
              (s.n31 = -y + p),
              (s.n32 = d + f),
              (s.n33 = c + n * n * h),
              (s.n34 = 0),
              s
            );
          }),
          (t.prototype.calculateMultiply = function(t, e) {
            var i = t.n11,
              n = e.n11,
              o = t.n21,
              r = e.n21,
              s = t.n31,
              c = e.n31,
              u = t.n12,
              h = e.n12,
              a = t.n22,
              f = e.n22,
              p = t.n32,
              l = e.n32,
              y = t.n13,
              d = e.n13,
              _ = t.n23,
              v = e.n23,
              b = t.n33,
              m = e.n33,
              x = t.n14,
              g = e.n14,
              M = t.n24,
              O = e.n24,
              P = t.n34,
              w = e.n34;
            (this.n11 = i * n + u * r + y * c),
              (this.n12 = i * h + u * f + y * l),
              (this.n13 = i * d + u * v + y * m),
              (this.n14 = i * g + u * O + y * w + x),
              (this.n21 = o * n + a * r + _ * c),
              (this.n22 = o * h + a * f + _ * l),
              (this.n23 = o * d + a * v + _ * m),
              (this.n24 = o * g + a * O + _ * w + M),
              (this.n31 = s * n + p * r + b * c),
              (this.n32 = s * h + p * f + b * l),
              (this.n33 = s * d + p * v + b * m),
              (this.n34 = s * g + p * O + b * w + P);
          }),
          (t.multiply = function(e, i) {
            var n = new t();
            return n.calculateMultiply(e, i), n;
          }),
          (t.multiplyVector = function(t, e) {
            var i = e.x,
              n = e.y,
              o = e.z;
            (e.x = i * t.n11 + n * t.n12 + o * t.n13 + t.n14),
              (e.y = i * t.n21 + n * t.n22 + o * t.n23 + t.n24),
              (e.z = i * t.n31 + n * t.n32 + o * t.n33 + t.n34);
          }),
          t
        );
      })();
      e.Matrix4 = i;
    },
    function(t, e, i) {
      "use strict";
      var n =
        (this && this.__extends) ||
        (function() {
          var t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            };
          return function(e, i) {
            function n() {
              this.constructor = e;
            }
            t(e, i),
              (e.prototype =
                null === i
                  ? Object.create(i)
                  : ((n.prototype = i.prototype), new n()));
          };
        })();
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = i(7),
        r = i(10),
        s = i(16),
        c = i(22),
        u = i(23),
        h = (function(t) {
          function e(e, i) {
            void 0 === e && (e = 1), void 0 === i && (i = 0);
            var n = t.call(this) || this;
            return (
              (n._forceX = 0),
              (n._forceY = 0),
              (n._forceZ = 0),
              (n._lookUp = new r.Dictionary()),
              (n._rigidity = e),
              (n.friction = i),
              n
            );
          }
          return (
            n(e, t),
            (e.prototype.setBounds = function(t, e, i, n, o, r) {
              void 0 === t && (t = Number.NEGATIVE_INFINITY),
                void 0 === e && (e = Number.POSITIVE_INFINITY),
                void 0 === i && (i = Number.NEGATIVE_INFINITY),
                void 0 === n && (n = Number.POSITIVE_INFINITY),
                void 0 === o && (o = Number.NEGATIVE_INFINITY),
                void 0 === r && (r = Number.POSITIVE_INFINITY),
                (this._useBounds = !0),
                (this._boundsMinX = t),
                (this._boundsMaxX = e),
                (this._boundsMinY = i),
                (this._boundsMaxY = n),
                (this._boundsMinZ = o),
                (this._boundsMaxZ = r);
            }),
            (e.prototype.clearBounds = function() {
              this._useBounds = !1;
            }),
            Object.defineProperty(e.prototype, "verletVertices", {
              get: function() {
                return this._vertices;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "friction", {
              get: function() {
                return 100 * (this._friction - 1);
              },
              set: function(t) {
                t < 0 && (t = 0), (this._friction = t / 100 + 1);
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "rigidity", {
              get: function() {
                return this._rigidity;
              },
              set: function(t) {
                var e,
                  i,
                  n = this._connections.length;
                for (
                  t > 1 ? (t = 1) : t < 0 && (t = 0),
                    this._rigidity = t,
                    e = 0.5 * t;
                  (i = this._connections[--n]);

                )
                  i.rigidity = e;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.setForce = function(t, e, i) {
              (this._forceX = t), (this._forceY = e), (this._forceZ = i);
            }),
            Object.defineProperty(e.prototype, "forceX", {
              get: function() {
                return this._forceX;
              },
              set: function(t) {
                this._forceX = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "forceY", {
              get: function() {
                return this._forceY;
              },
              set: function(t) {
                this._forceY = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "forceZ", {
              get: function() {
                return this._forceZ;
              },
              set: function(t) {
                this._forceZ = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.unlockAll = function() {
              for (
                var t, e = this._vertices.length;
                (t = this._vertices[--e]);

              )
                (t.mobileX = !0), (t.mobileY = !0), (t.mobileZ = !0);
            }),
            (e.prototype.lockXMin = function(t, e) {
              void 0 === t && (t = 0),
                void 0 === e && (e = 7),
                this.lockSet(this.mod.minX, "x", t, e);
            }),
            (e.prototype.lockXMax = function(t, e) {
              void 0 === t && (t = 0),
                void 0 === e && (e = 7),
                this.lockSet(this.mod.maxX, "x", t, e);
            }),
            (e.prototype.lockYMin = function(t, e) {
              void 0 === t && (t = 0),
                void 0 === e && (e = 7),
                this.lockSet(this.mod.minY, "y", t, e);
            }),
            (e.prototype.lockYMax = function(t, e) {
              void 0 === t && (t = 0),
                void 0 === e && (e = 7),
                this.lockSet(this.mod.maxY, "y", t, e);
            }),
            (e.prototype.lockZMin = function(t, e) {
              void 0 === t && (t = 0),
                void 0 === e && (e = 7),
                this.lockSet(this.mod.minZ, "z", t, e);
            }),
            (e.prototype.lockZMax = function(t, e) {
              void 0 === t && (t = 0),
                void 0 === e && (e = 7),
                this.lockSet(this.mod.maxZ, "z", t, e);
            }),
            (e.prototype.lockSet = function(t, e, i, n) {
              void 0 === i && (i = 0), void 0 === n && (n = 7);
              for (
                var r, s = this._vertices.length;
                (r = this._vertices[--s]);

              )
                Math.abs(r[e] - t) <= i &&
                  (n & o.ModConstant.X && (r.mobileX = !1),
                  n & o.ModConstant.Y && (r.mobileY = !1),
                  n & o.ModConstant.Z && (r.mobileZ = !1));
            }),
            (e.prototype.setModifiable = function(e) {
              t.prototype.setModifiable.call(this, e),
                this.initVerletVertices(),
                this.initVerletConnections(),
                (this.rigidity = this._rigidity);
            }),
            (e.prototype.apply = function() {
              var t, e, i;
              for (t = this._connections.length; (e = this._connections[--t]); )
                e.update();
              for (t = this._vertices.length; (i = this._vertices[--t]); )
                i.mobileX && (i.x += this._forceX),
                  i.mobileY && (i.y += this._forceY),
                  i.mobileZ && (i.z += this._forceZ),
                  (i.velocityX /= this._friction),
                  (i.velocityY /= this._friction),
                  (i.velocityZ /= this._friction),
                  this._useBounds &&
                    (i.x < this._boundsMinX
                      ? (i.x = this._boundsMinX)
                      : i.x > this._boundsMaxX && (i.x = this._boundsMaxX),
                    i.y < this._boundsMinY
                      ? (i.y = this._boundsMinY)
                      : i.y > this._boundsMaxY && (i.y = this._boundsMaxY),
                    i.z < this._boundsMinZ
                      ? (i.z = this._boundsMinZ)
                      : i.z > this._boundsMaxZ && (i.z = this._boundsMaxZ)),
                  i.update();
            }),
            (e.prototype.initVerletVertices = function() {
              var t,
                e,
                i = this.mod.getVertices(),
                n = i.length;
              for (this._vertices = []; (t = i[--n]); )
                (e = new u.VerletVertex(t)),
                  this._vertices.push(e),
                  this._lookUp.setVal(t, e);
            }),
            (e.prototype.initVerletConnections = function() {
              var t,
                e,
                i,
                n = this.mod.getFaces(),
                o = n.length;
              this._connections = [];
              for (var r = 0; r < o; r++) {
                (t = n[r]), (e = t.vertices), (i = e.length);
                for (var s = 0; s < i - 1; s++)
                  this.createConnection(
                    this._lookUp.getVal(e[s]),
                    this._lookUp.getVal(e[s + 1])
                  ),
                    s > 1 &&
                      this.createConnection(
                        this._lookUp.getVal(e[0]),
                        this._lookUp.getVal(e[s])
                      );
                this.createConnection(
                  this._lookUp.getVal(e[i - 1]),
                  this._lookUp.getVal(e[0])
                );
              }
            }),
            (e.prototype.createConnection = function(t, e) {
              var i = t.distanceTo(e),
                n = new c.VerletConnection(t, e, i, this._rigidity);
              this._connections.push(n);
            }),
            e
          );
        })(s.Modifier);
      e.Cloth = h;
    },
    function(t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = (function() {
        function t(t, e, i, n) {
          void 0 === n && (n = 0.5),
            (this._rigidity = 0.5),
            (this._v1 = t),
            (this._v2 = e),
            (this._strictDistance = i),
            (this._rigidity = n);
        }
        return (
          Object.defineProperty(t.prototype, "rigidity", {
            get: function() {
              return this._rigidity;
            },
            set: function(t) {
              this._rigidity = t;
            },
            enumerable: !0,
            configurable: !0
          }),
          (t.prototype.update = function() {
            var t,
              e,
              i,
              n,
              o = this._v1.x,
              r = this._v2.x,
              s = this._v1.y,
              c = this._v2.y,
              u = this._v1.z,
              h = this._v2.z,
              a = r - o,
              f = c - s,
              p = h - u,
              l = Math.sqrt(a * a + f * f + p * p);
            l != this._strictDistance &&
              ((t = ((this._strictDistance - l) / l) * this._rigidity),
              (e = t * a),
              (i = t * f),
              (n = t * p),
              (this._v1.mobileX && this._v2.mobileX) || (e *= 2),
              (this._v1.mobileY && this._v2.mobileY) || (i *= 2),
              (this._v1.mobileZ && this._v2.mobileZ) || (n *= 2),
              this._v1.mobileX && (this._v1.x -= e),
              this._v1.mobileY && (this._v1.y -= i),
              this._v1.mobileZ && (this._v1.z -= n),
              this._v2.mobileX && (this._v2.x += e),
              this._v2.mobileY && (this._v2.y += i),
              this._v2.mobileZ && (this._v2.z += n));
          }),
          t
        );
      })();
      e.VerletConnection = i;
    },
    function(t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = (function() {
        function t(t) {
          (this.mobileX = !0),
            (this.mobileY = !0),
            (this.mobileZ = !0),
            (this._v = t),
            this.setPosition(this._v.x, this._v.y, this._v.z);
        }
        return (
          (t.prototype.setPosition = function(t, e, i) {
            (this._x = this._oldX = t),
              (this._y = this._oldY = e),
              (this._z = this._oldZ = i),
              (this._v.x = t),
              (this._v.y = e),
              (this._v.z = i);
          }),
          (t.prototype.update = function() {
            var t, e, i;
            this.mobileX &&
              ((t = this.x), (this.x += this.velocityX), (this._oldX = t)),
              this.mobileY &&
                ((e = this.y), (this.y += this.velocityY), (this._oldY = e)),
              this.mobileZ &&
                ((i = this.z), (this.z += this.velocityZ), (this._oldZ = i));
          }),
          Object.defineProperty(t.prototype, "x", {
            get: function() {
              return this._x;
            },
            set: function(t) {
              (this._x = t), this.mobileX || (this._oldX = t), (this._v.x = t);
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "y", {
            get: function() {
              return this._y;
            },
            set: function(t) {
              (this._y = t), this.mobileY || (this._oldY = t), (this._v.y = t);
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "z", {
            get: function() {
              return this._z;
            },
            set: function(t) {
              (this._z = t), this.mobileZ || (this._oldZ = t), (this._v.z = t);
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "velocityX", {
            get: function() {
              return this._x - this._oldX;
            },
            set: function(t) {
              this._oldX = this._x - t;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "velocityY", {
            get: function() {
              return this._y - this._oldY;
            },
            set: function(t) {
              this._oldY = this._y - t;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "velocityZ", {
            get: function() {
              return this._z - this._oldZ;
            },
            set: function(t) {
              this._oldZ = this._z - t;
            },
            enumerable: !0,
            configurable: !0
          }),
          (t.prototype.distanceTo = function(t) {
            return Math.sqrt(
              (this.x - t.x) * (this.x - t.x) +
                (this.y - t.y) * (this.y - t.y) +
                (this.z - t.z) * (this.z - t.z)
            );
          }),
          t
        );
      })();
      e.VerletVertex = i;
    },
    function(t, e, i) {
      "use strict";
      var n =
        (this && this.__extends) ||
        (function() {
          var t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            };
          return function(e, i) {
            function n() {
              this.constructor = e;
            }
            t(e, i),
              (e.prototype =
                null === i
                  ? Object.create(i)
                  : ((n.prototype = i.prototype), new n()));
          };
        })();
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = i(7),
        r = i(16),
        s = (function(t) {
          function e(e) {
            void 0 === e && (e = 0);
            var i = t.call(this) || this;
            return (
              (i.axc = o.ModConstant.NONE),
              (i.start = 0),
              (i.end = 0),
              (i.frc = e),
              i
            );
          }
          return (
            n(e, t),
            Object.defineProperty(e.prototype, "force", {
              get: function() {
                return this.frc;
              },
              set: function(t) {
                this.frc = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.constraintAxes = function(t) {
              this.axc = t;
            }),
            (e.prototype.setFalloff = function(t, e) {
              void 0 === t && (t = 0),
                void 0 === e && (e = 1),
                (this.start = t),
                (this.end = e);
            }),
            (e.prototype.apply = function() {
              for (
                var t = this.mod.getVertices(), e = t.length, i = 0;
                i < e;
                i++
              ) {
                var n = t[i],
                  o = Math.random() * this.force - this.force / 2,
                  r = n.getRatio(this.mod.maxAxis);
                this.start < this.end
                  ? (r < this.start && (r = 0), r > this.end && (r = 1))
                  : this.start > this.end
                  ? ((r = 1 - r),
                    r > this.start && (r = 0),
                    r < this.end && (r = 1))
                  : (r = 1),
                  1 & this.axc || (n.x += o * r),
                  (this.axc >> 1) & 1 || (n.y += o * r),
                  (this.axc >> 2) & 1 || (n.z += o * r);
              }
            }),
            e
          );
        })(r.Modifier);
      e.Noise = s;
    },
    function(t, e, i) {
      "use strict";
      var n =
        (this && this.__extends) ||
        (function() {
          var t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            };
          return function(e, i) {
            function n() {
              this.constructor = e;
            }
            t(e, i),
              (e.prototype =
                null === i
                  ? Object.create(i)
                  : ((n.prototype = i.prototype), new n()));
          };
        })();
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = i(6),
        r = i(16),
        s = (function(t) {
          function e(e, i, n) {
            void 0 === e && (e = 0),
              void 0 === i && (i = 0),
              void 0 === n && (n = 0);
            var r = t.call(this) || this;
            return (r.pivot = new o.Vector3(e, i, n)), r;
          }
          return (
            n(e, t),
            (e.prototype.setMeshCenter = function() {
              var t = -(this.mod.minX + this.mod.width / 2),
                e = -(this.mod.minY + this.mod.height / 2),
                i = -(this.mod.minZ + this.mod.depth / 2);
              this.pivot = new o.Vector3(t, e, i);
            }),
            (e.prototype.apply = function() {
              for (
                var t = this.mod.getVertices(), e = t.length, i = 0;
                i < e;
                i++
              ) {
                var n = t[i];
                n.vector = n.vector.add(this.pivot);
              }
              var o = this.pivot.clone();
              this.mod.updateMeshPosition(o.negate());
            }),
            e
          );
        })(r.Modifier);
      e.Pivot = s;
    },
    function(t, e, i) {
      "use strict";
      var n =
        (this && this.__extends) ||
        (function() {
          var t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            };
          return function(e, i) {
            function n() {
              this.constructor = e;
            }
            t(e, i),
              (e.prototype =
                null === i
                  ? Object.create(i)
                  : ((n.prototype = i.prototype), new n()));
          };
        })();
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = i(7),
        r = i(13),
        s = i(16),
        c = (function(t) {
          function e(e) {
            void 0 === e && (e = 0);
            var i = t.call(this) || this;
            return (
              (i._offset = 0.5),
              (i._constraint = o.ModConstant.NONE),
              (i._power = 1),
              (i._falloff = 1),
              (i._inverseFalloff = !1),
              (i._oneSide = !1),
              (i._swapAxes = !1),
              (i._force = e),
              i
            );
          }
          return (
            n(e, t),
            (e.prototype.setModifiable = function(e) {
              t.prototype.setModifiable.call(this, e),
                (this._skewAxis = this._skewAxis || e.maxAxis);
            }),
            (e.prototype.apply = function() {
              for (
                var t = this.mod.getVertices(), e = t.length, i = 0;
                i < e;
                i++
              ) {
                var n = t[i];
                if (
                  !(
                    (this._constraint == o.ModConstant.LEFT &&
                      n.getRatio(this._skewAxis) <= this._offset) ||
                    (this._constraint == o.ModConstant.RIGHT &&
                      n.getRatio(this._skewAxis) > this._offset)
                  )
                ) {
                  var s = n.getRatio(this._skewAxis) - this._offset;
                  this._oneSide && (s = Math.abs(s));
                  var c = n.getRatio(this.displaceAxis);
                  this._inverseFalloff && (c = 1 - c);
                  var u = this._falloff + c * (1 - this._falloff),
                    h = Math.pow(Math.abs(s), this._power) * r.XMath.sign(s, 1),
                    a = n.getValue(this.displaceAxis) + this.force * h * u;
                  n.setValue(this.displaceAxis, a);
                }
              }
            }),
            Object.defineProperty(e.prototype, "displaceAxis", {
              get: function() {
                switch (this._skewAxis) {
                  case o.ModConstant.X:
                    return this._swapAxes ? o.ModConstant.Z : o.ModConstant.Y;
                  case o.ModConstant.Y:
                    return this._swapAxes ? o.ModConstant.Z : o.ModConstant.X;
                  case o.ModConstant.Z:
                    return this._swapAxes ? o.ModConstant.Y : o.ModConstant.X;
                  default:
                    return 0;
                }
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "force", {
              get: function() {
                return this._force;
              },
              set: function(t) {
                this._force = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "constraint", {
              get: function() {
                return this._constraint;
              },
              set: function(t) {
                this._constraint = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "offset", {
              get: function() {
                return this._offset;
              },
              set: function(t) {
                this._offset = r.XMath.trim(0, 1, t);
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "power", {
              get: function() {
                return this._power;
              },
              set: function(t) {
                this._power = Math.max(1, t);
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "falloff", {
              get: function() {
                return this._falloff;
              },
              set: function(t) {
                this._falloff = r.XMath.trim(0, 1, t);
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "oneSide", {
              get: function() {
                return this._oneSide;
              },
              set: function(t) {
                this._oneSide = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "skewAxis", {
              get: function() {
                return this._skewAxis;
              },
              set: function(t) {
                this._skewAxis = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "swapAxes", {
              get: function() {
                return this._swapAxes;
              },
              set: function(t) {
                this._swapAxes = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "inverseFalloff", {
              get: function() {
                return this._inverseFalloff;
              },
              set: function(t) {
                this._inverseFalloff = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            e
          );
        })(s.Modifier);
      e.Skew = c;
    },
    function(t, e, i) {
      "use strict";
      var n =
        (this && this.__extends) ||
        (function() {
          var t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            };
          return function(e, i) {
            function n() {
              this.constructor = e;
            }
            t(e, i),
              (e.prototype =
                null === i
                  ? Object.create(i)
                  : ((n.prototype = i.prototype), new n()));
          };
        })();
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = i(20),
        r = i(6),
        s = i(16),
        c = (function(t) {
          function e(e) {
            var i = t.call(this) || this;
            return (
              (i.start = 0),
              (i.end = 1),
              (i._vector = new r.Vector3(1, 0, 1)),
              (i._vector2 = new r.Vector3(0, 1, 0)),
              (i.frc = e),
              (i.pow = 1),
              i
            );
          }
          return (
            n(e, t),
            (e.prototype.setFalloff = function(t, e) {
              void 0 === t && (t = 0),
                void 0 === e && (e = 1),
                (this.start = t),
                (this.end = e);
            }),
            Object.defineProperty(e.prototype, "force", {
              get: function() {
                return this.frc;
              },
              set: function(t) {
                this.frc = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "power", {
              get: function() {
                return this.pow;
              },
              set: function(t) {
                this.pow = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.apply = function() {
              for (
                var t = this.mod.getVertices(), e = t.length, i = 0;
                i < e;
                i++
              ) {
                var n = t[i],
                  r = n.ratioVector.multiply(this._vector2),
                  s = this.frc * Math.pow(r.magnitude, this.pow),
                  c = o.Matrix4.scaleMatrix(
                    1 + s * this._vector.x,
                    1 + s * this._vector.y,
                    1 + s * this._vector.z
                  ),
                  u = n.vector;
                o.Matrix4.multiplyVector(c, u), (n.vector = u);
              }
            }),
            e
          );
        })(s.Modifier);
      e.Taper = c;
    },
    function(t, e, i) {
      "use strict";
      var n =
        (this && this.__extends) ||
        (function() {
          var t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            };
          return function(e, i) {
            function n() {
              this.constructor = e;
            }
            t(e, i),
              (e.prototype =
                null === i
                  ? Object.create(i)
                  : ((n.prototype = i.prototype), new n()));
          };
        })();
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = i(20),
        r = i(6),
        s = i(16),
        c = (function(t) {
          function e(e) {
            void 0 === e && (e = 0);
            var i = t.call(this) || this;
            return (
              (i._vector = new r.Vector3(0, 1, 0)),
              (i.center = r.Vector3.ZERO),
              (i._angle = e),
              i
            );
          }
          return (
            n(e, t),
            Object.defineProperty(e.prototype, "angle", {
              get: function() {
                return this._angle;
              },
              set: function(t) {
                this._angle = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "vector", {
              get: function() {
                return this._vector;
              },
              set: function(t) {
                this._vector = t;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.apply = function() {
              this._vector.normalize();
              for (
                var t = new r.Vector3(
                    this.mod.maxX / 2,
                    this.mod.maxY / 2,
                    this.mod.maxZ / 2
                  ),
                  e = -r.Vector3.dot(this._vector, this.center),
                  i = 0;
                i < this.mod.getVertices().length;
                i++
              ) {
                var n = this.mod.getVertices()[i],
                  o =
                    r.Vector3.dot(new r.Vector3(n.x, n.y, n.z), this._vector) +
                    e;
                this.twistPoint(n, (o / t.magnitude) * this._angle);
              }
            }),
            (e.prototype.twistPoint = function(t, e) {
              var i = o.Matrix4.translationMatrix(t.x, t.y, t.z);
              (i = o.Matrix4.multiply(
                o.Matrix4.rotationMatrix(
                  this._vector.x,
                  this._vector.y,
                  this._vector.z,
                  e
                ),
                i
              )),
                (t.x = i.n14),
                (t.y = i.n24),
                (t.z = i.n34);
            }),
            e
          );
        })(s.Modifier);
      e.Twist = c;
    },
    function(t, e, i) {
      "use strict";
      var n =
        (this && this.__extends) ||
        (function() {
          var t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            };
          return function(e, i) {
            function n() {
              this.constructor = e;
            }
            t(e, i),
              (e.prototype =
                null === i
                  ? Object.create(i)
                  : ((n.prototype = i.prototype), new n()));
          };
        })();
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = i(20),
        r = i(6),
        s = i(16),
        c = (function(t) {
          function e() {
            var e = t.call(this) || this;
            return (
              (e.steerVector = new r.Vector3(0, 1, 0)),
              (e.rollVector = new r.Vector3(0, 0, 1)),
              (e.speed = 0),
              (e.turn = 0),
              (e.roll = 0),
              e
            );
          }
          return (
            n(e, t),
            (e.prototype.setModifiable = function(e) {
              t.prototype.setModifiable.call(this, e),
                (this._radius = e.width / 2);
            }),
            (e.prototype.apply = function() {
              this.roll += this.speed;
              var t,
                e = this.mod.getVertices(),
                i = e.length;
              if (0 != this.turn) {
                var n = o.Matrix4.rotationMatrix(
                    this.steerVector.x,
                    this.steerVector.y,
                    this.steerVector.z,
                    this.turn
                  ),
                  r = this.rollVector.clone();
                o.Matrix4.multiplyVector(n, r),
                  (t = o.Matrix4.rotationMatrix(r.x, r.y, r.z, this.roll));
              } else
                t = o.Matrix4.rotationMatrix(
                  this.rollVector.x,
                  this.rollVector.y,
                  this.rollVector.z,
                  this.roll
                );
              for (var s = 0; s < i; s++) {
                var c = e[s],
                  u = c.vector.clone();
                0 != this.turn && o.Matrix4.multiplyVector(n, u),
                  o.Matrix4.multiplyVector(t, u),
                  (c.x = u.x),
                  (c.y = u.y),
                  (c.z = u.z);
              }
            }),
            Object.defineProperty(e.prototype, "step", {
              get: function() {
                return (this._radius * this.speed) / Math.PI;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "perimeter", {
              get: function() {
                return 2 * this._radius * Math.PI;
              },
              enumerable: !0,
              configurable: !0
            }),
            Object.defineProperty(e.prototype, "radius", {
              get: function() {
                return this._radius;
              },
              enumerable: !0,
              configurable: !0
            }),
            e
          );
        })(s.Modifier);
      e.Wheel = c;
    },
    function(t, e, i) {
      "use strict";
      var n =
        (this && this.__extends) ||
        (function() {
          var t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            };
          return function(e, i) {
            function n() {
              this.constructor = e;
            }
            t(e, i),
              (e.prototype =
                null === i
                  ? Object.create(i)
                  : ((n.prototype = i.prototype), new n()));
          };
        })();
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = i(16),
        r = i(31),
        s = (function(t) {
          function e() {
            var e = t.call(this) || this;
            return (e.eventEmitter = new r.EventEmitter()), e;
          }
          return (
            n(e, t),
            (e.prototype.apply = function() {
              for (
                var t = this.mod.getVertices(), e = t.length, i = 0;
                i < e;
                i++
              ) {
                var n = t[i];
                this.renderVector && this.renderVector(n, i, e);
              }
              this.dispatchEvent("CHANGE");
            }),
            (e.prototype.addEventListener = function(t, e) {
              this.eventEmitter.on(t, e);
            }),
            (e.prototype.dispatchEvent = function(t) {
              return this.eventEmitter.emit(t);
            }),
            (e.prototype.hasEventListener = function(t) {
              return this.eventEmitter.has(t);
            }),
            (e.prototype.removeEventListener = function(t, e) {
              this.eventEmitter.off(t, e);
            }),
            e
          );
        })(o.Modifier);
      e.UserDefined = s;
    },
    function(t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = (function() {
        function t() {}
        return (
          (t.prototype.on = function(t, e) {
            return n || (n = {}), n[t] || (n[t] = []), n[t].push(e), e;
          }),
          (t.prototype.emit = function(t) {
            for (var e = [], i = 1; i < arguments.length; i++)
              e[i - 1] = arguments[i];
            var o = !1;
            if (t && n) {
              var r = n[t];
              if (!r) return o;
              r = r.slice();
              var s,
                c = r.length,
                u = Array.prototype.slice.call(arguments);
              for (u.shift(); c--; ) {
                var s = r[c];
                o = o || s.apply(null, u);
              }
            }
            return !!o;
          }),
          (t.prototype.one = function(t, e) {
            var i = this,
              n = Array.prototype.slice.call(arguments, 2),
              o = function() {
                i.off(t, o), e.apply(null, n);
              };
            this.on(t, o);
          }),
          (t.prototype.has = function(t) {
            return !(!n || !n[t]);
          }),
          (t.prototype.off = function(t, e) {
            if (n && n[t])
              for (var i = n[t], o = 0, r = i.length; o < r; o++)
                if (i[o].toString() == e.toString()) {
                  1 == r ? delete n[t] : i.splice(o, 1);
                  break;
                }
          }),
          (t.prototype.offAll = function(t) {
            t ? n && delete n[t] : (n = null);
          }),
          t
        );
      })();
      e.EventEmitter = i;
      var n;
    }
  ]);
});
