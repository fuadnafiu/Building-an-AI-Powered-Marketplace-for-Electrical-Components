"""
Database models and setup for current nai marketplace
"""
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

Base = declarative_base()

# Database Models
class Product(Base):
    __tablename__ = 'products'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    description = Column(Text)
    category = Column(String(100))
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    manufacturer = Column(String(100))
    image_url = Column(String(500))
    vendor_id = Column(Integer, ForeignKey('vendors.id'))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    vendor = relationship("Vendor", back_populates="products")
    
class Vendor(Base):
    __tablename__ = 'vendors'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    email = Column(String(200), unique=True)
    location = Column(String(200))
    rating = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    products = relationship("Product", back_populates="vendor")

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(200), unique=True, nullable=False)
    password_hash = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)

class Order(Base):
    __tablename__ = 'orders'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    product_id = Column(Integer, ForeignKey('products.id'))
    quantity = Column(Integer, default=1)
    total_price = Column(Float)
    status = Column(String(50), default='pending')  # pending, confirmed, shipped, delivered
    created_at = Column(DateTime, default=datetime.utcnow)

# Database connection
DATABASE_URL = "sqlite:///./marketplace.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)

def init_db():
    """Create all tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created!")

def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()

def seed_sample_data():
    """Add sample products matching trained AI model categories"""
    db = SessionLocal()
    
    # Check if data exists
    if db.query(Vendor).count() > 0:
        print("⚠️  Sample data already exists")
        db.close()
        return
    
    # Create vendors - Real Bangladesh electronics shops
    vendors = [
        Vendor(name="Techshop BD", email="info@techshopbd.com", location="Dhaka, Bangladesh", rating=4.8),
        Vendor(name="Ryans Computers", email="support@ryanscomputers.com", location="Dhaka, Bangladesh", rating=4.7),
        Vendor(name="Circuit Valley", email="sales@circuitvalley.com.bd", location="Chittagong, Bangladesh", rating=4.6),
        Vendor(name="RoboMart BD", email="info@robomartbd.com", location="Sylhet, Bangladesh", rating=4.9),
        Vendor(name="DIY Electronics BD", email="hello@diyelectronics.com.bd", location="Khulna, Bangladesh", rating=4.5),
    ]
    db.add_all(vendors)
    db.commit()
    
    # Create products matching the 36 trained categories with BD context
    products = [
        # Capacitors
        Product(name="Bypass Capacitor 100nF Ceramic", description="High-quality ceramic bypass capacitor, 50V rating, perfect for noise filtering", 
                category="Bypass-capacitor", price=5, stock=500, manufacturer="Murata", 
                image_url="/dataset/electronic-components/images/Bypass-capacitor/Bypass-capacitor001.jpg", vendor_id=1),
        
        Product(name="Electrolytic Capacitor 1000µF 25V", description="Radial aluminum electrolytic capacitor, low ESR, 105°C rated", 
                category="Electrolytic-capacitor", price=12, stock=300, manufacturer="Nichicon", 
                image_url="/dataset/electronic-components/images/Electrolytic-capacitor/Electrolytic-capacitor001.jpg", vendor_id=2),
        
        Product(name="Electrolytic Capacitor 470µF 35V", description="High ripple current capacitor for power supply applications", 
                category="Electrolytic-capacitor", price=15, stock=250, manufacturer="Panasonic", 
                image_url="/dataset/electronic-components/images/Electrolytic-capacitor/Electrolytic-capacitor002.jpg", vendor_id=1),
        
        # ICs and Microcontrollers
        Product(name="ATmega328P-PU Microcontroller", description="8-bit AVR microcontroller, Arduino compatible, DIP-28 package", 
                category="Integrated-micro-circuit", price=350, stock=80, manufacturer="Microchip", 
                image_url="/dataset/electronic-components/images/Integrated-micro-circuit/Integrated-micro-circuit001.jpg", vendor_id=4),
        
        Product(name="555 Timer IC NE555P", description="Precision timing circuit, versatile timer IC for electronics projects", 
                category="Integrated-micro-circuit", price=15, stock=400, manufacturer="Texas Instruments", 
                image_url="/dataset/electronic-components/images/Integrated-micro-circuit/Integrated-micro-circuit002.jpg", vendor_id=1),
        
        Product(name="LM358 Dual Op-Amp IC", description="Low power dual operational amplifier, DIP-8 package", 
                category="Integrated-micro-circuit", price=18, stock=350, manufacturer="STMicroelectronics", 
                image_url="/dataset/electronic-components/images/Integrated-micro-circuit/Integrated-micro-circuit003.jpg", vendor_id=2),
        
        Product(name="Memory Chip 24C256 EEPROM", description="256K I2C Serial EEPROM memory chip, DIP-8 package", 
                category="memory-chip", price=45, stock=150, manufacturer="Microchip", 
                image_url="/dataset/electronic-components/images/memory-chip/memory-chip001.jpg", vendor_id=3),
        
        Product(name="Arduino Nano Microchip ATmega328", description="Complete microchip module with USB, perfect for robotics", 
                category="microchip", price=280, stock=120, manufacturer="Arduino Clone", 
                image_url="/dataset/electronic-components/images/microchip/microchip001.jpg", vendor_id=4),
        
        Product(name="ESP32 Microprocessor Module", description="Dual-core WiFi+Bluetooth microprocessor, 240MHz, IoT ready", 
                category="microprocessor", price=650, stock=90, manufacturer="Espressif", 
                image_url="/dataset/electronic-components/images/microprocessor/microprocessor001.jpg", vendor_id=5),
        
        # LEDs
        Product(name="5mm Red LED High Brightness", description="Super bright red LED, 20mA, 3.3V forward voltage - Pack of 50", 
                category="LED", price=50, stock=800, manufacturer="Everlight", 
                image_url="/dataset/electronic-components/images/LED/LED001.jpg", vendor_id=1),
        
        Product(name="WS2812B RGB LED Strip", description="Addressable RGB LED strip, 60 LEDs/meter, works with Arduino", 
                category="LED", price=420, stock=100, manufacturer="Worldsemi", 
                image_url="/dataset/electronic-components/images/LED/LED002.jpg", vendor_id=3),
        
        Product(name="LED Light Circuit Board Module", description="Pre-wired LED circuit with resistors, ready to use", 
                category="light-circuit", price=85, stock=200, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/light-circuit/light-circuit001.jpg", vendor_id=2),
        
        # Transistors and Semiconductors
        Product(name="BC557 PNP Transistor", description="General purpose PNP transistor, TO-92 package - Pack of 20", 
                category="PNP-transistor", price=25, stock=400, manufacturer="Fairchild", 
                image_url="/dataset/electronic-components/images/PNP-transistor/PNP-transistor001.jpg", vendor_id=1),
        
        Product(name="2N3906 PNP Transistor", description="High-performance PNP switching transistor - Pack of 20", 
                category="PNP-transistor", price=30, stock=350, manufacturer="ON Semiconductor", 
                image_url="/dataset/electronic-components/images/PNP-transistor/PNP-transistor002.jpg", vendor_id=2),
        
        Product(name="BC547 Junction Transistor NPN", description="General purpose NPN junction transistor, TO-92 - Pack of 20", 
                category="junction-transistor", price=22, stock=450, manufacturer="Fairchild", 
                image_url="/dataset/electronic-components/images/junction-transistor/junction-transistor001.jpg", vendor_id=3),
        
        Product(name="2N2222A General Purpose Transistor", description="Universal NPN switching transistor for projects", 
                category="transistor", price=28, stock=380, manufacturer="ON Semiconductor", 
                image_url="/dataset/electronic-components/images/transistor/transistor001.jpg", vendor_id=1),
        
        Product(name="1N4007 Semiconductor Diode", description="1A 1000V rectifier diode, through-hole - Pack of 50", 
                category="semiconductor-diode", price=40, stock=500, manufacturer="Vishay", 
                image_url="/dataset/electronic-components/images/semiconductor-diode/semiconductor-diode001.jpg", vendor_id=2),
        
        Product(name="Silicon Semiconductor Package", description="Assorted semiconductor components for electronics", 
                category="semi-conductor", price=180, stock=120, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/semi-conductor/semi-conductor001.jpg", vendor_id=4),
        
        # Resistors and Variable Resistors
        Product(name="10K Potentiometer Linear", description="Rotary potentiometer, 10KΩ linear taper, shaft type", 
                category="potentiometer", price=35, stock=300, manufacturer="Alpha", 
                image_url="/dataset/electronic-components/images/potentiometer/potentiometer001.jpg", vendor_id=1),
        
        Product(name="Potential Divider Resistor Network", description="Precision voltage divider module for circuits", 
                category="potential-divider", price=45, stock=180, manufacturer="Bourns", 
                image_url="/dataset/electronic-components/images/potential-divider/potential-divider001.jpg", vendor_id=2),
        
        Product(name="5K Rheostat Variable Resistor", description="Wire-wound rheostat, 5KΩ, 25W power rating", 
                category="rheostat", price=180, stock=80, manufacturer="Vishay", 
                image_url="/dataset/electronic-components/images/rheostat/rheostat001.jpg", vendor_id=3),
        
        # Relays and Switches
        Product(name="5V SPDT Relay Module", description="Single pole double throw relay, LED indicator, for Arduino", 
                category="relay", price=65, stock=250, manufacturer="Songle", 
                image_url="/dataset/electronic-components/images/relay/relay001.jpg", vendor_id=4),
        
        Product(name="12V Electric Relay 10A", description="Power relay for switching high current loads safely", 
                category="electric-relay", price=95, stock=200, manufacturer="Omron", 
                image_url="/dataset/electronic-components/images/electric-relay/electric-relay001.jpg", vendor_id=5),
        
        # Motors and Actuators
        Product(name="DC Motor Armature Replacement", description="12V DC motor armature for hobby motors and projects", 
                category="armature", price=220, stock=60, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/armature/armature001.jpg", vendor_id=1),
        
        Product(name="12V Push-Pull Solenoid", description="Electric solenoid actuator, 12V DC, 10mm stroke", 
                category="solenoid", price=280, stock=85, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/solenoid/solenoid001.jpg", vendor_id=2),
        
        # Transformers
        Product(name="Step-Down Transformer 220V to 12V", description="AC step-down transformer, 2A output, iron core", 
                category="step-down-transformer", price=450, stock=70, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/step-down-transformer/step-down-transformer001.jpg", vendor_id=3),
        
        Product(name="Step-Up Transformer 12V to 220V", description="Boost transformer for inverter projects, 100W", 
                category="step-up-transformer", price=580, stock=50, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/step-up-transformer/step-up-transformer001.jpg", vendor_id=4),
        
        # Coils and Inductors
        Product(name="Induction Coil 10mH", description="Toroid induction coil, 10mH inductance, high Q factor", 
                category="induction-coil", price=85, stock=150, manufacturer="Bourns", 
                image_url="/dataset/electronic-components/images/induction-coil/induction-coil001.jpg", vendor_id=1),
        
        # Fuses and Protection
        Product(name="Glass Cartridge Fuse 5A Pack", description="250V fast-blow glass fuse, 5x20mm - Pack of 10", 
                category="cartridge-fuse", price=30, stock=400, manufacturer="Littelfuse", 
                image_url="/dataset/electronic-components/images/cartridge-fuse/cartridge-fuse001.jpg", vendor_id=2),
        
        Product(name="Voltage Stabilizer Circuit Module", description="Adjustable voltage stabilizer, 3-33V output", 
                category="stabilizer", price=120, stock=180, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/stabilizer/stabilizer001.jpg", vendor_id=3),
        
        Product(name="Current Limiter Clipper Module", description="Precision current limiting and clipping circuit", 
                category="limiter-clipper", price=95, stock=140, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/limiter-clipper/limiter-clipper001.jpg", vendor_id=4),
        
        # Cables and Connectors
        Product(name="Alligator Clip Lead Set", description="Test leads with alligator clips, 50cm - Set of 10", 
                category="clip-lead", price=120, stock=250, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/clip-lead/clip-lead001.jpg", vendor_id=1),
        
        Product(name="Male to Male Jumper Cable 40pcs", description="Breadboard jumper cables, 20cm, 40 pieces assorted colors", 
                category="jumper-cable", price=80, stock=350, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/jumper-cable/jumper-cable001.jpg", vendor_id=2),
        
        # Heat Management
        Product(name="TO-220 Aluminum Heat Sink", description="Extruded aluminum heat sink for transistors and regulators", 
                category="heat-sink", price=25, stock=300, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/heat-sink/heat-sink001.jpg", vendor_id=3),
        
        # Filaments and Lighting
        Product(name="LED Filament Bulb 5W", description="Edison-style LED filament bulb, warm white, E27 base", 
                category="filament", price=180, stock=150, manufacturer="Philips Compatible", 
                image_url="/dataset/electronic-components/images/filament/filament001.jpg", vendor_id=4),
        
        # RF and Signal Processing
        Product(name="Omnidirectional WiFi Antenna 5dBi", description="2.4GHz omnidirectional antenna with SMA connector", 
                category="omni-directional-antenna", price=280, stock=90, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/omni-directional-antenna/omni-directional-antenna001.jpg", vendor_id=5),
        
        Product(name="RF Local Oscillator Module", description="Frequency generation module for radio circuits", 
                category="local-oscillator", price=420, stock=50, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/local-oscillator/local-oscillator001.jpg", vendor_id=1),
        
        Product(name="Signal Attenuator 0-40dB", description="Variable RF attenuator for signal processing", 
                category="attenuator", price=350, stock=70, manufacturer="Mini-Circuits", 
                image_url="/dataset/electronic-components/images/attenuator/attenuator001.jpg", vendor_id=2),
        
        Product(name="CD4051 Analog Multiplexer IC", description="8-channel analog multiplexer/demultiplexer chip", 
                category="multiplexer", price=35, stock=200, manufacturer="Texas Instruments", 
                image_url="/dataset/electronic-components/images/multiplexer/multiplexer001.jpg", vendor_id=3),
        
        # Pulse and Signal Generators
        Product(name="NE555 Pulse Generator Module", description="Adjustable frequency pulse generator, 1Hz-2MHz", 
                category="pulse-generator", price=95, stock=180, manufacturer="Generic", 
                image_url="/dataset/electronic-components/images/pulse-generator/pulse-generator001.jpg", vendor_id=4),
        
        # Shunts
        Product(name="Current Sensing Shunt Resistor", description="0.1Ω precision shunt resistor, 5W, 1% tolerance", 
                category="shunt", price=45, stock=160, manufacturer="Vishay", 
                image_url="/dataset/electronic-components/images/shunt/shunt001.jpg", vendor_id=5),
    ]
    db.add_all(products)
    db.commit()
    
    print(f"✅ Added {len(vendors)} Bangladesh vendors and {len(products)} products matching trained AI categories!")
    db.close()

if __name__ == "__main__":
    init_db()
    seed_sample_data()
