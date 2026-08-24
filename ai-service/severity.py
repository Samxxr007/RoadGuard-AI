"""
Severity classification based on bounding-box area and detection confidence.

This is an AI-estimated severity — NOT an engineering road-damage standard.
Classification is approximate and intended for prioritisation only.
"""


def classify_severity(area_m2: float, confidence: float) -> str:
    """
    Classify pothole severity from estimated physical area and confidence.

    Thresholds (indicative):
        < 0.25 m²      →  Low
        0.25 – 1.0 m²  →  Medium
        1.0 – 3.0 m²   →  High
        > 3.0 m²       →  Critical

    A very high confidence detection is nudged one level up in severity.
    """
    if area_m2 < 0.25:
        base = "Low"
    elif area_m2 < 1.0:
        base = "Medium"
    elif area_m2 < 3.0:
        base = "High"
    else:
        base = "Critical"

    # Confidence nudge: high-confidence detections in borderline areas move up
    if confidence >= 0.90 and base == "Low":
        base = "Medium"
    elif confidence >= 0.92 and base == "Medium":
        base = "High"

    return base


def severity_priority(severity: str) -> int:
    """Return numeric priority (higher = more urgent)."""
    return {"Low": 1, "Medium": 2, "High": 3, "Critical": 4}.get(severity, 0)
