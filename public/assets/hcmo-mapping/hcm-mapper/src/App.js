
import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    system: {
      name: '',
      monitors: '',
      limitedHumanInteraction: false,
      circadianRhythm: {
        period: '',
        extendsIndefinitely: false,
      },
    },
    enclosure: {
      name: '',
      physicalSpace: {
        width: '',
        length: '',
        height: '',
        units: 'cm',
      },
      needsPlan: {
        food: false,
        water: false,
        socialContact: false,
        safetyFromThreat: false,
        environmentalEnrichment: false,
      },
    },
    hardware: {
      name: '',
      sensors: [],
      actuators: [],
    },
    software: {
      name: '',
    },
    animal: {
      name: '',
    }
  });

  const [newSensor, setNewSensor] = useState({ name: '', captures: '' });
  const [newActuator, setNewActuator] = useState({ name: '', elicits: '' });

  const handleSystemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, system: { ...prev.system, [name]: type === 'checkbox' ? checked : value } }));
  };

  const handleEnclosureChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, enclosure: { ...prev.enclosure, [name]: value } }));
  };
  
  const handlePhysicalSpaceChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, enclosure: { ...prev.enclosure, physicalSpace: { ...prev.enclosure.physicalSpace, [name]: value } } }));
  };

  const handleNeedsPlanChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, enclosure: { ...prev.enclosure, needsPlan: { ...prev.enclosure.needsPlan, [name]: checked } } }));
  };

  const handleHardwareChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, hardware: { ...prev.hardware, [name]: value } }));
  };

  const handleSoftwareChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, software: { ...prev.software, [name]: value } }));
  };
  
  const handleAnimalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, animal: { ...prev.animal, [name]: value } }));
  };

  const handleNewSensorChange = (e) => {
    const { name, value } = e.target;
    setNewSensor(prev => ({ ...prev, [name]: value }));
  };

  const addSensor = () => {
    if (newSensor.name && newSensor.captures) {
      setFormData(prev => ({ ...prev, hardware: { ...prev.hardware, sensors: [...prev.hardware.sensors, newSensor] } }));
      setNewSensor({ name: '', captures: '' });
    }
  };

  const handleNewActuatorChange = (e) => {
    const { name, value } = e.target;
    setNewActuator(prev => ({ ...prev, [name]: value }));
  };

  const addActuator = () => {
    if (newActuator.name && newActuator.elicits) {
      setFormData(prev => ({ ...prev, hardware: { ...prev.hardware, actuators: [...prev.hardware.actuators, newActuator] } }));
      setNewActuator({ name: '', elicits: '' });
    }
  };


  const exportJsonLd = () => {
    const { system, enclosure, hardware, software, animal } = formData;
    const needs = Object.entries(enclosure.needsPlan).filter(([, value]) => value).map(([key]) => key);
    
    const jsonLdData = {
      '@context': 'hcm-context.jsonld',
      '@graph': [
        {
          'id': `hcm:${system.name}`,
          'type': 'hcm:System',
          'label': system.name,
          'hcm:monitors': { 'id': `hcm:${system.monitors}`, 'type': 'hcm:BehaviorOrPhysiology', 'label': system.monitors },
          'hcm:limitedHumanInteraction': system.limitedHumanInteraction,
          'hcm:hasCircadianRhythm': {
            'id': 'hcm:SystemCircadianRhythm',
            'type': 'hcm:CircadianRhythm',
            'hcm:period': system.circadianRhythm.period,
            'hcm:extendsIndefinitely': system.circadianRhythm.extendsIndefinitely
          },
          'hcm:hasEnclosure': {
            'id': `hcm:${enclosure.name}`,
            'type': 'hcm:Enclosure',
            'label': enclosure.name,
            'hcm:hasPhysicalSpace': {
              'id': 'hcm:EnclosurePhysicalSpace',
              'type': 'hcm:PhysicalSpace',
              'hcm:hasDimensions': {
                'id': 'hcm:EnclosureDimensions',
                'type': 'hcm:Dimensions',
                'hcm:width': enclosure.physicalSpace.width,
                'hcm:length': enclosure.physicalSpace.length,
                'hcm:height': enclosure.physicalSpace.height,
                'hcm:unit': enclosure.physicalSpace.units
              }
            },
            'hcm:hasNeedsPlan': {
              'id': 'hcm:SystemNeedsPlan',
              'type': 'hcm:NeedsPlan',
              'hcm:hasNeedItem': needs.map(need => ({ 'id': `hcm:${need}`, 'type': 'hcm:Need', 'label': need }))
            }
          },
          'hcm:hasHardware': {
            'id': `hcm:${hardware.name}`,
            'type': 'hcm:Hardware',
            'label': hardware.name,
            'hcm:hasSensor': hardware.sensors.map(sensor => ({
              'id': `hcm:${sensor.name}`,
              'type': 'hcm:Sensor',
              'label': sensor.name,
              'hcm:captures': { 'id': `hcm:${sensor.captures}`, 'type': 'hcm:BehaviorOrPhysiology', 'label': sensor.captures }
            })),
            'hcm:hasActuator': hardware.actuators.map(actuator => ({
              'id': `hcm:${actuator.name}`,
              'type': 'hcm:Actuator',
              'label': actuator.name,
              'hcm:elicits': { 'id': `hcm:${actuator.elicits}`, 'type': 'hcm:BehaviorOrPhysiology', 'label': actuator.elicits }
            }))
          },
          'hcm:hasSoftware': {
            'id': `hcm:${software.name}`,
            'type': 'hcm:Software',
            'label': software.name
          },
          'hcm:houses': {
            'id': `hcm:${animal.name}`,
            'type': 'hcm:Animal',
            'label': animal.name,
            'hcm:livesIn': `hcm:${enclosure.name}`
          }
        }
      ]
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonLdData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "hcm-mapping.jsonld");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const exportCsv = () => {
    const { system, enclosure, hardware, software, animal } = formData;
    let csvContent = "data:text/csv;charset=utf-8,";
    
    const headers = [
        "System Name", "Monitors", "Limited Human Interaction", "Circadian Period", "Circadian Extends Indefinitely",
        "Enclosure Name", "Width", "Length", "Height", "Units",
        "Food", "Water", "Social Contact", "Safety From Threat", "Environmental Enrichment",
        "Hardware Name", "Software Name", "Animal Name"
    ];

    const rows = [
        system.name, system.monitors, system.limitedHumanInteraction, system.circadianRhythm.period, system.circadianRhythm.extendsIndefinitely,
        enclosure.name, enclosure.physicalSpace.width, enclosure.physicalSpace.length, enclosure.physicalSpace.height, enclosure.physicalSpace.units,
        enclosure.needsPlan.food, enclosure.needsPlan.water, enclosure.needsPlan.socialContact, enclosure.needsPlan.safetyFromThreat, enclosure.needsPlan.environmentalEnrichment,
        hardware.name, software.name, animal.name
    ];

    csvContent += headers.join(",") + "\r\n";
    csvContent += rows.join(",") + "\r\n";

    hardware.sensors.forEach(sensor => {
        let sensorRow = Array(headers.length).fill('');
        sensorRow[0] = "Sensor";
        sensorRow[1] = sensor.name;
        sensorRow[2] = sensor.captures;
        csvContent += sensorRow.join(",") + "\r\n";
    });

    hardware.actuators.forEach(actuator => {
        let actuatorRow = Array(headers.length).fill('');
        actuatorRow[0] = "Actuator";
        actuatorRow[1] = actuator.name;
        actuatorRow[2] = actuator.elicits;
        csvContent += actuatorRow.join(",") + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "hcm-mapping.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>HCM Ontology Mapper</h1>
      </header>
      <main>
        <div className="form-container">
          
          <div className="form-section">
            <h2>System</h2>
            <input name="name" value={formData.system.name} onChange={handleSystemChange} placeholder="System Name" />
            <input name="monitors" value={formData.system.monitors} onChange={handleSystemChange} placeholder="Monitored Behavior/Physiology" />
            <label><input type="checkbox" name="limitedHumanInteraction" checked={formData.system.limitedHumanInteraction} onChange={handleSystemChange} /> Limited Human Interaction</label>
            <h3>Circadian Rhythm</h3>
            <input name="period" value={formData.system.circadianRhythm.period} onChange={e => setFormData(prev => ({ ...prev, system: { ...prev.system, circadianRhythm: { ...prev.system.circadianRhythm, period: e.target.value } } }))} placeholder="Period (e.g., P1D)" />
            <label><input type="checkbox" name="extendsIndefinitely" checked={formData.system.circadianRhythm.extendsIndefinitely} onChange={e => setFormData(prev => ({ ...prev, system: { ...prev.system, circadianRhythm: { ...prev.system.circadianRhythm, extendsIndefinitely: e.target.checked } } }))} /> Extends Indefinitely</label>
          </div>

          <div className="form-section">
            <h2>Enclosure</h2>
            <input name="name" value={formData.enclosure.name} onChange={handleEnclosureChange} placeholder="Enclosure Name" />
            <h3>Physical Space</h3>
            <input name="width" value={formData.enclosure.physicalSpace.width} onChange={handlePhysicalSpaceChange} placeholder="Width" />
            <input name="length" value={formData.enclosure.physicalSpace.length} onChange={handlePhysicalSpaceChange} placeholder="Length" />
            <input name="height" value={formData.enclosure.physicalSpace.height} onChange={handlePhysicalSpaceChange} placeholder="Height" />
            <input name="units" value={formData.enclosure.physicalSpace.units} onChange={handlePhysicalSpaceChange} placeholder="Units" />
            <h3>Needs Plan</h3>
            <label><input type="checkbox" name="food" checked={formData.enclosure.needsPlan.food} onChange={handleNeedsPlanChange} /> Food</label>
            <label><input type="checkbox" name="water" checked={formData.enclosure.needsPlan.water} onChange={handleNeedsPlanChange} /> Water</label>
            <label><input type="checkbox" name="socialContact" checked={formData.enclosure.needsPlan.socialContact} onChange={handleNeedsPlanChange} /> Social Contact</label>
            <label><input type="checkbox" name="safetyFromThreat" checked={formData.enclosure.needsPlan.safetyFromThreat} onChange={handleNeedsPlanChange} /> Safety From Threat</label>
            <label><input type="checkbox" name="environmentalEnrichment" checked={formData.enclosure.needsPlan.environmentalEnrichment} onChange={handleNeedsPlanChange} /> Environmental Enrichment</label>
          </div>

          <div className="form-section">
            <h2>Hardware</h2>
            <input name="name" value={formData.hardware.name} onChange={handleHardwareChange} placeholder="Hardware Name" />
            <h3>Sensors</h3>
            <div className="dynamic-list">
              {formData.hardware.sensors.map((sensor, index) => (
                <div key={index} className="list-item">{sensor.name} ({sensor.captures})</div>
              ))}
            </div>
            <div className="add-item">
              <input name="name" value={newSensor.name} onChange={handleNewSensorChange} placeholder="Sensor Name" />
              <input name="captures" value={newSensor.captures} onChange={handleNewSensorChange} placeholder="Captures (Behavior/Physiology)" />
              <button onClick={addSensor}>Add Sensor</button>
            </div>
            <h3>Actuators</h3>
            <div className="dynamic-list">
              {formData.hardware.actuators.map((actuator, index) => (
                <div key={index} className="list-item">{actuator.name} ({actuator.elicits})</div>
              ))}
            </div>
            <div className="add-item">
              <input name="name" value={newActuator.name} onChange={handleNewActuatorChange} placeholder="Actuator Name" />
              <input name="elicits" value={newActuator.elicits} onChange={handleNewActuatorChange} placeholder="Elicits (Behavior/Physiology)" />
              <button onClick={addActuator}>Add Actuator</button>
            </div>
          </div>

          <div className="form-section">
            <h2>Software</h2>
            <input name="name" value={formData.software.name} onChange={handleSoftwareChange} placeholder="Software Name" />
          </div>
          
          <div className="form-section">
            <h2>Animal</h2>
            <input name="name" value={formData.animal.name} onChange={handleAnimalChange} placeholder="Animal Name/ID" />
          </div>

          <div className="button-group">
            <button onClick={exportJsonLd}>Export as JSON-LD</button>
            <button onClick={exportCsv}>Export as CSV</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
