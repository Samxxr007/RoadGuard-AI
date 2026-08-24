import pytest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from severity import classify_severity, severity_priority

def test_severity_classification():
    # Low severity: small area
    assert classify_severity(0.1, 0.70) == "Low"
    
    # Medium severity: 0.25 - 1.0 m2
    assert classify_severity(0.5, 0.75) == "Medium"
    
    # High severity: 1.0 - 3.0 m2
    assert classify_severity(2.0, 0.85) == "High"
    
    # Critical severity: > 3.0 m2
    assert classify_severity(4.5, 0.95) == "Critical"

def test_severity_priority():
    assert severity_priority("Low") == 1
    assert severity_priority("Medium") == 2
    assert severity_priority("High") == 3
    assert severity_priority("Critical") == 4
