import React, { useState, useEffect } from 'react';

const HealthStatus = () => {
  const [healthStatus, setHealthStatus] = useState({
    status: 'checking',
    service: '',
    lastChecked: null,
    error: null
  });
  const [showTooltip, setShowTooltip] = useState(false);

  // Get API URL from environment or use default
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';

  const checkHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      
      setHealthStatus({
        status: data.status,
        service: data.service,
        lastChecked: new Date().toLocaleTimeString(),
        error: null
      });
    } catch (error) {
      setHealthStatus({
        status: 'error',
        service: '',
        lastChecked: new Date().toLocaleTimeString(),
        error: error.message
      });
    }
  };

  useEffect(() => {
    checkHealth();
    
    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (healthStatus.status) {
      case 'healthy':
        return '#10b981'; // green
      case 'error':
        return '#ef4444'; // red
      case 'checking':
        return '#f59e0b'; // yellow
      default:
        return '#6b7280'; // gray
    }
  };

  const getStatusText = () => {
    switch (healthStatus.status) {
      case 'healthy':
        return 'Backend Online';
      case 'error':
        return 'Backend Offline';
      case 'checking':
        return 'Checking...';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="health-circle-container">
      <div 
        className="health-circle"
        style={{ 
          backgroundColor: getStatusColor(),
          borderColor: getStatusColor()
        }}
        onClick={checkHealth}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        title={getStatusText()}
      >
        <div className="health-circle-inner"></div>
      </div>
      
      {showTooltip && (
        <div className="health-tooltip">
          <div className="tooltip-header">
            <div className="tooltip-status">{getStatusText()}</div>
            <div className="tooltip-dot" style={{ backgroundColor: getStatusColor() }}></div>
          </div>
          {healthStatus.service && (
            <div className="tooltip-service">{healthStatus.service}</div>
          )}
          {healthStatus.lastChecked && (
            <div className="tooltip-time">Last checked: {healthStatus.lastChecked}</div>
          )}
          {healthStatus.error && (
            <div className="tooltip-error">Error: {healthStatus.error}</div>
          )}
          <div className="tooltip-hint">Click to refresh</div>
        </div>
      )}
    </div>
  );
};

export default HealthStatus;