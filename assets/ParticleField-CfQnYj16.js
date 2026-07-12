import{r as w,u as Y,j as n,A as k}from"./vendor-three-BfVex51G.js";import"./vendor-react-C9UvMUQl.js";const H=`
  attribute vec3 color;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation: larger when closer to camera
    gl_PointSize = 32.0 / -mvPosition.z;
  }
`,V=`
  varying vec3 vColor;
  void main() {
    // SDF (Signed Distance Field) to shape default square points into gorgeous soft circles
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    float glow = smoothstep(0.5, 0.05, dist);
    gl_FragColor = vec4(vColor, glow * 0.75);
  }
`,K=()=>{const c=w.useRef(null),i=w.useRef({x:0,y:0}),l=w.useRef({x:0,y:0});w.useEffect(()=>{const f=e=>{l.current.x=e.clientX/window.innerWidth*2-1,l.current.y=-(e.clientY/window.innerHeight)*2+1};return window.addEventListener("mousemove",f),()=>window.removeEventListener("mousemove",f)},[]);const{positions:T,colors:U,count:A,cols:E,rows:I}=w.useMemo(()=>{const u=new Float32Array(9075),o=new Float32Array(3025*3);let t=0;for(let r=0;r<55;r++)for(let s=0;s<55;s++){const g=(r-27.5)*.7,m=(s-55/2)*.7;u[t*3]=g,u[t*3+1]=0,u[t*3+2]=m,o[t*3]=92/255,o[t*3+1]=88/255,o[t*3+2]=102/255,t++}return{positions:u,colors:o,count:3025,cols:55,rows:55}},[]);return Y(f=>{if(!c.current)return;const e=f.clock.getElapsedTime();i.current.y+=(l.current.x*1.5-i.current.y)*.04,i.current.x+=(-l.current.y*1-i.current.x)*.04;const B=l.current.x*12,u=-l.current.y*12,o=c.current.geometry.attributes.position.array,t=c.current.geometry.attributes.color.array,r=92/255,s=88/255,g=102/255,m={r:66/255,g:133/255,b:244/255},y={r:234/255,g:67/255,b:53/255},M={r:251/255,g:188/255,b:5/255},P={r:52/255,g:168/255,b:83/255};let a=0;for(let j=0;j<E;j++)for(let F=0;F<I;F++){const h=(j-E/2)*.7,x=(F-I/2)*.7,W=Math.sqrt(h*h+x*x);let G=Math.sin(W*.38-e*1.3)*.85+Math.cos(h*.22+e*.8)*.45+Math.sin(x*.3+e)*.25;const R=h-B,z=x-u,C=Math.sqrt(R*R+z*z),X=Math.max(0,4-C)*.45;G+=X,o[a*3]=h+i.current.y*.7,o[a*3+1]=G+i.current.x*1.2-2.2,o[a*3+2]=x+i.current.y*.7;let _=r,q=s,D=g;const L=4;if(C<L){const S=Math.pow(Math.max(0,1-C/L),1.5),d=Math.atan2(z,R);let b=r,v=s,p=g;d>=-Math.PI&&d<-Math.PI/2?(b=m.r,v=m.g,p=m.b):d>=-Math.PI/2&&d<0?(b=y.r,v=y.g,p=y.b):d>=0&&d<Math.PI/2?(b=M.r,v=M.g,p=M.b):(b=P.r,v=P.g,p=P.b),_=r+S*(b-r),q=s+S*(v-s),D=g+S*(p-g)}t[a*3]=_,t[a*3+1]=q,t[a*3+2]=D,a++}c.current.geometry.attributes.position.needsUpdate=!0,c.current.geometry.attributes.color.needsUpdate=!0,c.current.rotation.y=e*.015}),n.jsxs(n.Fragment,{children:[n.jsx("fog",{attach:"fog",args:["#0F0D13",10,26]}),n.jsxs("points",{ref:c,children:[n.jsxs("bufferGeometry",{children:[n.jsx("bufferAttribute",{attach:"attributes-position",args:[T,3],count:A}),n.jsx("bufferAttribute",{attach:"attributes-color",args:[U,3],count:A})]}),n.jsx("shaderMaterial",{attach:"material",vertexShader:H,fragmentShader:V,transparent:!0,depthWrite:!1,blending:k})]})]})};export{K as default};
