import { SectionShell } from '../layout/SectionShell'
import { NetworkDiagram } from '../NetworkDiagram'
import './SystemsSection.css'

export function SystemsSection() {
  return (
    <SectionShell
      id="systems"
      index="01"
      title="Systems"
      subtitle="Robotics, embedded intelligence, and autonomous infrastructure"
    >
      <div className="systems">
        <NetworkDiagram />
        <div className="systems__panel">
          <p className="systems__copy">
            Edge inference on constrained hardware. Vision pipelines in the field. Control loops that
            close in milliseconds — engineered to ship, not to demo.
          </p>
          <ul className="systems__list">
            <li>Perception stacks — YOLO, Re-ID, multimodal sensing</li>
            <li>Edge compute — Raspberry Pi, Arduino, RFID telemetry</li>
            <li>Production orchestration — FastAPI, AWS Bedrock, evaluation frameworks</li>
          </ul>
        </div>
      </div>
    </SectionShell>
  )
}
