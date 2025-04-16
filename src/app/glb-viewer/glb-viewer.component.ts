import {
  Component, ElementRef, AfterViewInit,
  ViewChild, HostListener,
  ChangeDetectorRef
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SupabaseService } from '../services/supabase.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';



@Component({
  selector: 'app-glb-viewer',
  templateUrl: './glb-viewer.component.html',
  styleUrls: ['./glb-viewer.component.css'],
  
})
export class GlbViewerComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: true }) container!: ElementRef;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private model!: THREE.Object3D;
  private keysPressed: { [key: string]: boolean } = {};
  private moveSpeed = 0.05;
  private movementSpeed = 0.2; // 🔥 Increase this value for faster movement
private moveForward = false;
private moveBackward = false;
private moveLeft = false;
private moveRight = false;
private moveUp = false;
private moveDown = false;
// Add this near your other properties
currentPrice: number = 0;
currentArea: number = 0;
selectedMaterial: { name: string, price: number } | null = null;
// Add these properties to your component
showInfoPanel = false;
infoPanelPosition = { x: 0, y: 0 };
  
  

  showColorPanel = false;
  panelPosition = { x: 0, y: 0 };
  selectedObject: THREE.Mesh | null = null;
  colorOptions = [
    '#ff0000', '#00ff00', '#0000ff', '#ffff00',
    '#ff00ff', '#00ffff', '#ff9900', '#9900ff',
    '#0099ff', '#ff0099', '#99ff00', '#ffffff',
    '#000000', '#888888', '#ffcccc', '#ccffcc'
  ];

  materialOptions = [
    { name: 'Black Marble', texture: 'assets/textures/blackMarble.jpg', price: 85 },
    { name: 'Brick', texture: 'assets/textures/brick.jpg', price: 45 },
    { name: 'Burlap', texture: 'assets/textures/burlap.jpg', price: 12 },
    { name: 'Cement', texture: 'assets/textures/cement.jpg', price: 25 },
    { name: 'Ceramic', texture: 'assets/textures/ceramic.jpg', price: 32 },
    { name: 'Cobblestone', texture: 'assets/textures/cobblestone.jpg', price:  65},
    { name: 'Granite', texture: 'assets/textures/granite.jpg', price: 75 },
    { name: 'Herringbone', texture: 'assets/textures/herringbone.jpg', price: 55 },
    { name: 'Tile', texture: 'assets/textures/tile.jpg', price: 28 },
    { name: 'Water', texture: 'assets/textures/water.jpg', price: 1 },
    { name: 'Wood', texture: 'assets/textures/wood.jpg', price: 40 },
    { name: 'Wood Plank', texture: 'assets/textures/woodPlank.jpg', price: 48 }
  ];
  

  

  constructor(
    private elementRef: ElementRef,
    private supabase: SupabaseService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    
  ) {document.addEventListener('keydown', (e) => this.keysPressed[e.key.toLowerCase()] = true);
    document.addEventListener('keyup', (e) => this.keysPressed[e.key.toLowerCase()] = false);
    }

  
  


  ngOnInit(): void {
    const modelId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(modelId)) {
      this.supabase.getModelById(modelId).then(model => {
        if (model?.url) {
          this.loadModelFromUrl(model.url);
        } else {
          this.addPlaceholderModel();
        }
      });
    }
  }
  ngAfterViewInit(): void {
    if (this.container) {
      this.initScene();
      this.animate();
      // Remove the document click listener since we'll handle it differently
    } else {
      console.error("Container is undefined!");
    }
  }

  private initScene(): void {
    
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdddddd);

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    this.camera.position.set(0, 2, 2);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 50;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 5);

    this.scene.add(ambientLight, directionalLight);
  }

  loadModelFromUrl(url: string): void {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      this.model = gltf.scene;
      this.scene.add(this.model);
    }, undefined, (error) => {
      console.error('Error loading model:', error);
    });
  }
  

  calculateSurfaceArea(object: THREE.Mesh): number {
    let area = 0;
    const geometry = object.geometry;
  
    // Ensure geometry is in non-indexed format for easier iteration
    const tempGeometry = geometry.index !== null ? geometry.toNonIndexed() : geometry;
    const position = tempGeometry.attributes['position'];

  
    for (let i = 0; i < position.count; i += 3) {
      const vA = new THREE.Vector3().fromBufferAttribute(position, i);
      const vB = new THREE.Vector3().fromBufferAttribute(position, i + 1);
      const vC = new THREE.Vector3().fromBufferAttribute(position, i + 2);
  
      const ab = new THREE.Vector3().subVectors(vB, vA);
      const ac = new THREE.Vector3().subVectors(vC, vA);
      const cross = new THREE.Vector3().crossVectors(ab, ac);
      const triangleArea = cross.length() / 2;
  
      area += triangleArea;
    }
  
    return area;
  }


  private addPlaceholderModel(): void {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    this.model = new THREE.Mesh(geometry, material);
    this.scene.add(this.model);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
  
    const velocity = new THREE.Vector3();
  
    const direction = new THREE.Vector3();
    this.camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();
  
    const right = new THREE.Vector3().crossVectors(this.camera.up, direction).normalize();
  
    if (this.moveForward) velocity.add(direction);
    if (this.moveBackward) velocity.sub(direction);
    if (this.moveLeft) velocity.sub(right);
    if (this.moveRight) velocity.add(right);
    if (this.moveUp) velocity.y += 1;
    if (this.moveDown) velocity.y -= 1;
  
    velocity.normalize().multiplyScalar(this.movementSpeed);
    this.camera.position.add(velocity);
  
    this.renderer.render(this.scene, this.camera);
  }
  
  
  private updateCameraMovement(): void {
    const direction = new THREE.Vector3();
    const speed = this.moveSpeed;
  
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
  
    this.camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
  
    right.crossVectors(forward, up).normalize();
  
    if (this.keysPressed['w']) direction.add(forward);
    if (this.keysPressed['s']) direction.sub(forward);
    if (this.keysPressed['a']) direction.sub(right);
    if (this.keysPressed['d']) direction.add(right);
    if (this.keysPressed[' ']) this.camera.position.y += speed; // Space = up
    if (this.keysPressed['shift']) this.camera.position.y -= speed; // Shift = down
  
    direction.normalize();
    this.camera.position.addScaledVector(direction, speed);
  }



  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'KeyW':
        this.moveForward = true;
        break;
      case 'KeyS':
        this.moveBackward = true;
        break;
      case 'KeyA':
        this.moveLeft = true;
        break;
      case 'KeyD':
        this.moveRight = true;
        break;
        case 'Space': this.moveUp = true; break;
        case 'ShiftLeft': this.moveDown = true; break;
    }
  }
  
  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    switch (event.code) {
      case 'KeyW':
        this.moveForward = false;
        break;
      case 'KeyS':
        this.moveBackward = false;
        break;
      case 'KeyA':
        this.moveLeft = false;
        break;
      case 'KeyD':
        this.moveRight = false;
        break;
        case 'Space': this.moveUp = false; break;
    case 'ShiftLeft': this.moveDown = false; break;
    }
  }
  


  
  @HostListener('window:resize')
  onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  @HostListener('click', ['$event'])
onClick(event: MouseEvent): void {
  if (!this.model) return;

  // Check if click was on any panel
  const target = event.target as HTMLElement;
  if (target.closest('.material-panel') || target.closest('.info-panel')) {
    return;
  }

  const rect = this.renderer.domElement.getBoundingClientRect();
  this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  this.raycaster.setFromCamera(this.mouse, this.camera);

  const intersects = this.raycaster.intersectObject(this.model, true);
  if (intersects.length > 0) {
    const selectedObject = intersects[0].object as THREE.Mesh;
    if (selectedObject.material instanceof THREE.MeshStandardMaterial) {
      this.selectedObject = selectedObject;
      this.currentArea = this.calculateSurfaceArea(selectedObject);
      
      // Position and show panels
      this.showColorPanel = true;
      this.showInfoPanel = true;
      this.infoPanelPosition = { x: event.clientX + 20, y: event.clientY - 50 };
      
      this.updatePrice();
      this.changeDetector.detectChanges();
    }
  }
}
  updatePrice(): void {
    if (this.selectedMaterial) {
      this.currentPrice = this.currentArea * this.selectedMaterial.price;
    } else {
      this.currentPrice = 0;
    }
  }


  

  applyColor(color: string, event: MouseEvent): void {
    event.stopPropagation();
    if (this.selectedObject) {
      this.selectedObject.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.1,
        roughness: 0.7
      });
      this.selectedMaterial = null;
      this.updatePrice();
    }
  }

  applyTexture(material: { name: string, texture: string, price: number }, event: MouseEvent): void {
    event.stopPropagation();
    if (this.selectedObject) {
      const loader = new THREE.TextureLoader();
      loader.load(material.texture, (texture) => {
        this.selectedObject!.material = new THREE.MeshStandardMaterial({
          map: texture,
          metalness: 0.2,
          roughness: 0.6
        });
        this.selectedMaterial = { name: material.name, price: material.price };
        this.updatePrice();
      });
    }
  }

  closeColorPanel(): void {
    this.showColorPanel = false;
    // Don't reset selectedObject here as we might want to keep info panel open
  }
  
  closeInfoPanel(): void {
    this.showInfoPanel = false;
    this.selectedObject = null;
    this.selectedMaterial = null;
  }

}
